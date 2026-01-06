
/**
 * QuizGame component - A React quiz application with timed questions
 * 
 * @component
 * @description
 * Manages a quiz game flow with the following features:
 * - Multiple choice questions from a question bank
 * - Countdown timer (5 seconds per question)
 * - Score tracking
 * - Quiz start/end states
 * - Answer validation and progression to next question
 * 
 * @example
 * return <QuizGame />
 * 
 * @returns {JSX.Element} The quiz game component with question display, timer, and score
 * 
 * @state {number} currentQuestion - Index of the current question being displayed
 * @state {string} selectedOption - The user's currently selected answer option
 * @state {number} score - Total number of correct answers
 * @state {boolean} quizEnd - Flag indicating if the quiz has ended
 * @state {boolean} quizStart - Flag indicating if the quiz has started
 * @state {number} timeLeft - Remaining time in seconds for current question
 * 
 * @function startTimer - Initializes and manages the countdown timer for each question
 * @function handleNextQuestion - Advances to the next question or ends the quiz
 * @function resetQuiz - Resets all quiz state to initial values and restarts
 * @function handleOptionChange - Updates selected answer option
 * @function handleFormSubmit - Submits answer and moves to next question
 * @function checkAnswer - Validates selected answer and updates score
 * 
 * @reference https://www.geeksforgeeks.org/reactjs/create-a-quiz-app-using-reactjs/
 */
import React, { useState, useRef, useEffect } from "react";
import Question from "./Question";
import { qBank } from "./QuestionBank";
import Score from "./Score";
import { Box, Typography, Button } from "@mui/material";
/* Taken inspiration from https://www.geeksforgeeks.org/reactjs/create-a-quiz-app-using-reactjs/*/

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [quizEnd, setQuizEnd] = useState<boolean>(false);
    const [quizStart, setQuizStart] = useState<boolean>(true);

    const [timeLeft, setTimeLeft] = useState<number>(5);

    // replace the local timer variable with a ref
    const timerRef = useRef<number | null>(null);

    // Tweak these to change speed:
    // Option A: make TICK_MS larger to slow down (e.g. 1500 ms)
    // Option B: make DECREMENT < 1 and TICK_MS smaller for smooth slow-down (e.g. decrement 0.5 every 500ms)
    const TICK_MS = 1000;
    const DECREMENT = 1;

    // Start the timer (clears any existing interval first)
    function startTimer(tickMs = TICK_MS, decrement = DECREMENT) {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        timerRef.current = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= decrement) {
                    // stop at 0 and mark quiz end
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    setQuizEnd(true);
                    return 0;
                }
                return +(prev - decrement); // + to keep number type
            });
        }, tickMs);
    }

    // ensure timer is started/restarted when question changes
    useEffect(() => {
        // reset time left for each question
        if (!quizStart) {
            setTimeLeft(5);
            startTimer();

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            };
        }

    }, [currentQuestion, quizStart]);

    // update handleNextQuestion to clear existing interval before moving on
    const handleNextQuestion = () => {
        if (currentQuestion + 1 < qBank.length) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption('');
        } else {
            setQuizEnd(true);
            setTimeLeft(0);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const resetQuiz = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        setSelectedOption('');
        setCurrentQuestion(0);
        setScore(0);
        setQuizStart(true)
        setQuizEnd(false);
        setTimeLeft(5);

        // restart timer for the first question
        startTimer();
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkAnswer();
        handleNextQuestion();
    };

    const checkAnswer = () => {
        if (selectedOption === qBank[currentQuestion].answer) { setScore(prev => prev + 1); }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
            {quizStart && <Button variant="contained" color="primary" onClick={() => setQuizStart(false)} sx={{ mt: 2, textTransform: "uppercase", }}>start</Button>}
            <Typography variant="h6" sx={{ mb: 2 }}> Time Left: {timeLeft} seconds </Typography>
            {!quizEnd ? (
                <Question
                    question={qBank[currentQuestion]}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                    onSubmit={handleFormSubmit}
                />
            ) : (
                <Score
                    score={score}
                    onNextQuestion={handleNextQuestion}
                    resetQuiz={resetQuiz}
                />
            )}
        </Box>
    );
};
export default QuizGame;