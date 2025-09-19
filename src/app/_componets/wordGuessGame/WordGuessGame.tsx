"Use client"
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, ButtonGroup } from "@mui/material";
import { sampleWords } from "./wordGuessGameData";

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

const GFGWordGame = () => {
    const theme = useTheme();
    const [wordData, setWordData] = useState(getRandomWord());
    const [msg, setMsg] = useState("");
    const [chosenLetters, setChosenLetters] = useState<Array<string>>([]);
    const [hints, setHints] = useState(3);
    const [displayWord, setDisplayWord] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);

    useEffect(() => {
        if (wrongGuesses >= 3) {
            // Code to show the popup or message for game over
            window.alert("Game Over! You made too many wrong guesses.");
            restartGameFunction();
        }
    }, [wrongGuesses]);

    const letterSelectFunction = (letter: string) => {
        if (!chosenLetters.includes(letter)) {
            setChosenLetters([...chosenLetters, letter]);
            if (!wordData.word.includes(letter)) {
                setWrongGuesses(wrongGuesses + 1);
            }
        }
    };

    const hintFunction = () => {
        if (hints > 0) {
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
                color="primary"
                onClick={() => letterSelectFunction(letter)}
                disabled={chosenLetters.includes(letter)}
                className={`letter-button ${chosenLetters.includes(letter) ? "selected" : ""}`}
                sx={{ padding: "10px 15px", margin: "5px", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", }}
            >
                {letter}
            </Button>
        ));
    };

    const checkWordGuessedFunction = () => {
        return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
    };

    const guessFunction = () => {
        if (checkWordGuessedFunction()) { setMsg("Congrats, You have guessed the word correctly!"); }
        else {
            setMsg("You made a Wrong Guess!. Try again!");
            setDisplayWord(true);
        }
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg("");
        setChosenLetters([]);
        setHints(3);
        setDisplayWord(false);
        setGameOver(false);
        setWrongGuesses(0);
    };

    return (
        <Box sx={{ width: "100%", height: "740px", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <Typography variant="h1" sx={{ marginBottom: "30px" }}>Word Guess Game</Typography>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", marginBottom: "50px" }}>
                {Array.from(wordData.word).map((letter, index) => (
                    <Box
                        key={index}
                        // className={`letter ${chosenLetters.includes(letter) ? "visible" : ""}`}
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
                            color: "#fff",
                            backgroundColor: theme.palette.primary.light,
                            opacity: 1,
                            transition: " opacity 0.2s ease-in-out",
                            //visibility: chosenLetters.includes(letter) ? 'visible' : 'hidden'
                        }}
                    >
                        {chosenLetters.includes(letter) ? letter : ""}
                    </Box>
                ))}
            </Box>
            <Typography variant="body1">Hint: {wordData.description}</Typography>
            {msg && (
                <Box sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", }}>
                    <Typography variant="h6">{msg}</Typography>
                    {displayWord && <Typography variant="h6">Correct word was: {wordData.word}</Typography>}
                </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 1, marginTop: "10px" }}>
                <Button variant="contained" color="error" className="restart-button" onClick={restartGameFunction} >
                    <Typography variant="body1">Restart</Typography>
                </Button>
                <Button variant="contained" color="error" onClick={removeCharacterFunction} disabled={!chosenLetters.length} className="remove-button" >
                    <Typography variant="body1">Remove Letter</Typography>
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "30px", gap: 1, marginTop: "10px", width: "70%" }}>
                {displayLettersFunction()}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <Box sx={{ display:"flex", flexDirection: "row", marginBottom: "20px", alignItems: "center", justifyContent: "center", gap: 1,fontSize: "20px", fontWeight: "bold" }}>
                    <Typography variant="body1">Hints Remaining: {hints}{" "}</Typography>
                    <Button
                        onClick={hintFunction}
                        disabled={hints === 0}
                        color="success"
                        variant="contained"
                        sx={{
                            padding: " 6px 14px",
                            fontSize: "16px",
                            fontWight: "bold",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease-in-out",
                        }}
                    >
                        Get Hint
                    </Button>
                </Box>
                {!msg && (
                    <Button
                        onClick={guessFunction}
                        disabled={!chosenLetters.length}
                        className="guess-button"
                    >
                        Guess
                    </Button>
                )}
            </Box>
        </Box >
    );
};

export default GFGWordGame;