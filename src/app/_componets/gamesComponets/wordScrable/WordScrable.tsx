import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";

/* Taken inspiration from this:https://www.geeksforgeeks.org/javascript/word-scramble-game-using-javascript/ */
const words = ["christmas", "easter", "thanksgiving", "halloween", "hanukkah", "diwali", "newyear", "valentines", "stpatrick", "ramadan", "kwanzaa",];
const hints = ["Celebrated on December 25th", "Holiday celebrating Jesus' resurrection", "American holiday with turkey and gratitude", "Spooky night of costumes and candy", "Jewish Festival of Lights", "Hindu Festival of Lights", "Marks the beginning of a new year", "Day of love and romance", "Irish holiday known for green and luck", "Month of fasting for Muslims", "African-American cultural celebration in December",];

const WordScrable = () => {
    const theme = useTheme();
    const [displayWord, setDisplayWord] = useState<string>("");
    const [displayHint, setDisplayHint] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [scrambleWord, setScrambleWord] = useState<string>("");

    // Function to shuffle letters
    const shuffle = useCallback((str: string) => {
        const strArray = Array.from(str);
        for (let i = 0; i < strArray.length - 1; ++i) {
            const j = Math.floor(Math.random() * strArray.length);
            // Swap letters
            const temp = strArray[i];
            strArray[i] = strArray[j];
            strArray[j] = temp;
        }
        return strArray.join(" ");
    }, [])

    // Function to check input and display result
    function check() {
        if (input.toLocaleLowerCase() === displayWord.toLocaleLowerCase()) setOutput("Result: Correct");
        else setOutput("Result: Incorrect");
    }

    // To refresh and show new word
    const refresh = useCallback(() => {
        const index = Math.floor(Math.random() * words.length);
        const word = words[index];
        const hint = hints[index];
        setDisplayWord(word);
        setDisplayHint(hint);
        setScrambleWord(shuffle(word).toUpperCase());
        setInput("");
        setOutput("Result:");
    }, [shuffle]);

    useEffect(() => {
        // Function call when page load for first time
        if (displayWord === "" && displayHint === "") refresh();
    }, [displayWord, displayHint, refresh]);

    return (
        <Box sx={{ width: "100%", height: "740px", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "x-large", color: "whitesmoke", border: `4px solid ${theme.palette.customColors[8]}`, padding: "0 5 1 5", textAlign: "center", borderRadius: "5px 0", gap: 3 }}>
            <Typography variant="h1" sx={{ borderBottom: "4px dashed white" }}>Word Guess Game</Typography>
            <Box sx={{ margin: "3 0", textAlign: "center", display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h1">{scrambleWord}</Typography>
                <Typography variant="h2"><b>Hint:</b> {displayHint}</Typography>
            </Box>
            <Box sx={{ margin: "3 0", textAlign: "center" }}>
                <TextField
                    id="input"
                    type="text"
                    placeholder="Guess correct word"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoComplete="off" // ✅ prevents previous answers
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: theme.palette.grey[400] + " !important", },
                            "&:hover fieldset": { borderColor: theme.palette.grey[500] + " !important", },
                            "&.Mui-focused fieldset": { borderColor: theme.palette.grey[600] + " !important", },
                        },
                        "& .MuiInputBase-input": { fontSize: "1rem", },
                    }}
                />
            </Box>
            <Typography variant="h3">{output}</Typography>
            <Box sx={{ marginBottom: 0, display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <Button variant="contained" color="success" onClick={check} sx={{ width: "150px", padding: "1", margin: "1", borderRadius: "5px", fontSize: "large" }}>Check</Button>
                <Button variant="contained" color="success" onClick={refresh} sx={{ width: "150px", padding: "1", margin: "1", borderRadius: "5px", fontSize: "large" }}>Refresh</Button>
            </Box>
        </Box >
    );
};

export default WordScrable;