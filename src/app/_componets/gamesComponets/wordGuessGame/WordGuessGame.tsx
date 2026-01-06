
/**
 * WordGuessGame component - An interactive word guessing game where players guess letters to reveal a hidden word.
 * 
 * @component
 * @returns {React.ReactElement} A game interface with letter selection, hints, and game controls
 * 
 * @description
 * This component implements a word guessing game with the following features:
 * - Random word selection from a predefined word list
 * - Letter selection with visual feedback
 * - Hint system (3 hints per game)
 * - Wrong guess tracking (game over at 3 wrong guesses)
 * - Word display circles that reveal letters as they are guessed
 * - Game restart functionality
 * - Remove letter functionality to undo the last selection
 * 
 * @example
 * ```tsx
 * <GFGWordGame />
 * ```
 * 
 * @state {simpleWordsType | null} wordData - The current word object being guessed
 * @state {string} msg - Message displayed to the player (success/error feedback)
 * @state {string} msgColor - Color of the message ("success" or "error")
 * @state {Array<string>} chosenLetters - Array of letters selected by the player
 * @state {number} hints - Number of remaining hints (max 3)
 * @state {boolean} displayWord - Flag to show the correct word on wrong guess
 * @state {number} wrongGuesses - Counter for incorrect letter guesses
 */
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { sampleWords, simpleWordsType } from "./wordGuessGameData";

/* Taken inspiration from this:https://www.geeksforgeeks.org/reactjs/word-guess-game-using-react/ */

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

const GFGWordGame = () => {
    const theme = useTheme();
    const [wordData, setWordData] = useState<simpleWordsType | null>(null);
    const [msg, setMsg] = useState("");
    const [msgColor, setMsgColor] = useState("success");
    const [chosenLetters, setChosenLetters] = useState<Array<string>>([]);
    const [hints, setHints] = useState(3);
    const [displayWord, setDisplayWord] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);

    useEffect(() => {
        if (wordData === null) setWordData(getRandomWord())
        if (wrongGuesses >= 3) {
            setMsgColor("error")
            setMsg("Game Over! You made too many wrong guesses. It was " + wordData?.word + ". Try again!");
        }
    }, [wrongGuesses, wordData]);

    const letterSelectFunction = (letter: string) => {
        if (!chosenLetters.includes(letter)) {
            setChosenLetters([...chosenLetters, letter]);
            if (wordData !== null && !wordData.word.includes(letter)) { setWrongGuesses(wrongGuesses + 1); }
        }
    };

    const hintFunction = () => {
        if (wordData !== null && hints > 0) {
            const hiddenLetterIndex = wordData.word.split("").findIndex((letter) => !chosenLetters.includes(letter));
            setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
            setHints(hints - 1);
        }
    };

    const removeCharacterFunction = () => { setChosenLetters(chosenLetters.slice(0, -1)); };

    const displayLettersFunction = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return Array.from(letters).map((letter, index) => (
            <Button
                key={index}
                variant="contained"
                onClick={() => letterSelectFunction(letter)}
                disabled={chosenLetters.includes(letter)}
                className={`letter-button ${chosenLetters.includes(letter) ? "selected" : ""}`}
                sx={{ padding: "10px 15px", margin: "5px", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", }}
            >
                {letter}
            </Button>
        ));
    };

    const checkWordGuessedFunction = () => { return wordData?.word.split("").every((letter) => chosenLetters.includes(letter)); };

    const guessFunction = () => {
        if (checkWordGuessedFunction()) { setMsg("Congrats, You have guessed the word correctly!"); }
        else {
            setMsgColor("error")
            setMsg("You made a Wrong Guess!. It was " + wordData?.word + ". Try again!");
            setDisplayWord(true);
        }
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg("");
        setMsgColor("success")
        setChosenLetters([]);
        setHints(3);
        setDisplayWord(false);
        setWrongGuesses(0);
    };

    return (
        <Box sx={{ width: "100%", height: "740px", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <Typography variant="h1" sx={{ marginBottom: "30px" }}>Word Guess Game</Typography>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", marginBottom: "50px" }}>
                {wordData && Array.from(wordData.word).map((letter, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50px",
                            height: "50px",
                            margin: " 0 5px",
                            borderRadius: " 50%",
                            fontSize: "20px",
                            fontWeight: "bold",
                            backgroundColor: theme.palette.primary.light,
                            opacity: 1,
                            transition: "opacity 0.2s ease-in-out",
                        }}
                    >
                        {chosenLetters.includes(letter) ? letter : ""}
                    </Box>
                ))}
            </Box>
            <Box>
                {wordData && <Typography variant="body1">Hint: {wordData.description}</Typography>}
            </Box>
            {wordData && msg && (
                <Box sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", }}>
                    <Typography variant="h6" color={msgColor}>{msg}</Typography>
                    {displayWord && <Typography variant="h6">Correct word was: {wordData.word}</Typography>}
                </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 1, marginTop: "10px" }}>
                <Button variant="contained" color="error" className="restart-button" onClick={restartGameFunction} ><Typography variant="body1">Restart</Typography></Button>
                <Button variant="contained" color="error" onClick={removeCharacterFunction} disabled={!chosenLetters.length} className="remove-button" ><Typography variant="body1">Remove Letter</Typography></Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "30px", gap: 1, marginTop: "10px", width: "70%" }}>
                {displayLettersFunction()}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "20px", alignItems: "center", justifyContent: "center", gap: 1, fontSize: "20px", fontWeight: "bold" }}>
                    <Typography variant="body1">Hints Remaining: {hints}{" "}</Typography>
                    <Button
                        onClick={hintFunction}
                        disabled={hints === 0}
                        color="success"
                        variant="contained"
                        sx={{ padding: " 6px 14px", fontSize: "16px", fontWight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s ease-in-out", }}
                    >
                        Get Hint
                    </Button>
                </Box>
                {!msg && (<Button onClick={guessFunction} disabled={!chosenLetters.length} className="guess-button">Guess</Button>)}
            </Box>
        </Box >
    );
};

export default GFGWordGame;