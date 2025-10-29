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