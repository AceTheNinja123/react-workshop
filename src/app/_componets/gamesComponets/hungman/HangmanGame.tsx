
/**
 * HangmanGame Component
 * 
 * A React-based Hangman game where players guess letters to reveal a hidden animal word.
 * The game includes three difficulty levels (Easy, Medium, Hard) with corresponding word pools.
 * Players have 6 attempts before losing, and must reveal all letters to win.
 * 
 * @component
 * @returns {JSX.Element} The rendered Hangman game interface with difficulty selector,
 *                        visual word display, keyboard for guessing, game canvas, and result messages
 * 
 * @example
 * return <HangmanGame />
 * 
 * @remarks
 * - Game state includes: selected word, guessed letters, mistake count, and difficulty mode
 * - Win condition: All letters in the word are guessed
 * - Loss condition: Player reaches 6 mistakes
 * - Difficulty affects word pool complexity and length
 * - Inspiration taken from GeeksforGeeks Hangman game tutorial
 */
"use client";
import React, { useState, useEffect , useCallback} from "react";
import { Box, Typography, Button, Grid, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, useTheme } from "@mui/material";
import HangmanCanvas from "./HangmanCanvas";
/* Taken inspiration from https://www.geeksforgeeks.org/reactjs/hangman-game-using-react/ */

const animalWords = {
    easy: ["CAT", "DOG", "LION", "BEAR", "WOLF", "FISH", "BIRD", "FROG", "DEER", "ZEBRA", "HORSE", "RABBIT"],
    medium: ["GIRAFFE", "KANGAROO", "DOLPHIN", "CHEETAH", "LEOPARD", "PENGUIN", "OSTRICH", "FLAMINGO", "BUFFALO", "CAMEL", "EAGLE", "PEACOCK", "MONKEY", "PANDA"],
    hard: ["ELEPHANT", "CROCODILE", "ALLIGATOR", "HIPPOPOTAMUS", "RHINOCEROS", "CHIMPANZEE", "GORILLA", "MEERKAT", "ANTELOPE", "OCTOPUS", "SQUID", "STARFISH", "WALRUS", "FALCON", "ARMADILLO", "PORCUPINE", "JAGUAR"]
};

const HangmanGame = () => {
    const [word, setWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState<Array<string>>([]);
    const [mistakes, setMistakes] = useState(0);
    const [mode, setMode] = useState<"medium" | "easy" | "hard">("easy");
    const theme = useTheme();
    const resetGame = useCallback(() => {
        setWord(chooseRandomWord(mode));
        setGuessedLetters([]);
        setMistakes(0);
    }, [mode]);

    useEffect(() => {
        if (mode) chooseRandomWord(mode)
        resetGame();
    }, [mode, resetGame]);

    const chooseRandomWord = (difficulty: "easy" | "medium" | "hard") => {
        const words = animalWords[difficulty];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!word.includes(letter)) { setMistakes(mistakes + 1); }
        }
    };
    const isGameWon = () => { return word.split("").every((letter) => guessedLetters.includes(letter)); };
    const isGameLost = () => { return mistakes >= 6; };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const modeType = (event.target as HTMLInputElement).value as "medium" | "easy" | "hard";
        chooseRandomWord(modeType);
        setMode(modeType);
    };

    return (
        <Box sx={{ display: 'flex', height: '750px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>Theme is animals</Typography>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: "bold", }}>
                <FormLabel id="mode-radio-buttons-group-label" sx={{ fontSize: 20, fontWeight: "bold", color: theme.palette.primary.main }}>Mode</FormLabel>
                <RadioGroup aria-labelledby="mode-radio-buttons-group-label" defaultValue="easy" name="radio-buttons-group" row value={mode} onChange={handleChange}                >
                    <FormControlLabel value="easy" control={<Radio sx={{ color: theme.palette.primary.main, '&.Mui-checked': { color: theme.palette.primary.dark, }, }} />} label="Easy" sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px', fontWeight: 'bold', }, }}/>
                    <FormControlLabel value="medium" control={<Radio sx={{ color: theme.palette.primary.main, '&.Mui-checked': { color: theme.palette.primary.dark, }, }} />} label="Medium" sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px', fontWeight: 'bold', }, }}/>
                    <FormControlLabel value="hard" control={<Radio sx={{ color: theme.palette.primary.main, '&.Mui-checked': { color: theme.palette.primary.dark, }, }} />} label="Hard" sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px', fontWeight: 'bold', }, }}/>
                </RadioGroup>
            </FormControl>
            <HangmanCanvas mistakes={mistakes} />

            {/* Word Display */}
            <Box sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center", gap: 2, fontSize: "1.8rem", }}>
                {word.split("").map((letter, index) => (
                    <Typography
                        key={index}
                        variant="h5"
                        sx={{
                            borderBottom: "2px solid",
                            px: 1,
                            minWidth: 30,
                            textAlign: "center",
                            color: guessedLetters.includes(letter) ? "primary.main" : "transparent",
                            borderBottomWidth: "2px",
                            borderBottomColor: "primary.main"
                        }}
                    >
                        {guessedLetters.includes(letter) ? letter : "_"}
                    </Typography>
                ))}
            </Box>

            {/* Keyboard */}
            <Grid container spacing={1} justifyContent="center" sx={{ my: 3, }}>
                {Array.from(Array(26)).map((_, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                        <Grid key={letter}>
                            <Button
                                variant="contained"
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.includes(letter)}
                                size="small"
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: guessedLetters.includes(letter) ? "grey.400" : "primary.main",
                                    "&:hover": { backgroundColor: guessedLetters.includes(letter) ? "grey.400" : "primary.dark", },
                                }}
                            >
                                <Typography variant="h4">{letter}</Typography>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Result Message */}
            {isGameWon() && (<Typography variant="h5" color="success.main" gutterBottom> 🎉 You won! </Typography>)}
            {isGameLost() && (<Typography variant="h5" color="error.main" gutterBottom> 😢 You lost! The word was: {word} </Typography>)}

            {/* New Game Button */}
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={resetGame}
                sx={{ mt: 2 }}
            >
                New Game
            </Button>
        </Box>
    );
};

export default HangmanGame;
