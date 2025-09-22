import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { IconHandGrab, IconHandStop, IconHandTwoFingers } from "@tabler/icons-react";
/*
    Taken insoration from this:https://www.geeksforgeeks.org/reactjs/create-rock-paper-scissor-game-using-reactjs/
*/
const RockPaperScissorsGame = () => {
    const theme = useTheme();
    const [playerVal, setPlayerVal] = useState<string | null>(null);
    const [computerVal, setComputerVal] = useState<string | null>(null);
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [compScore, setCompScore] = useState<number>(0);
    const customColors = theme.palette.customColors;

    const logic = (playerVal: string, computerVal: string) => {
        if (playerVal == computerVal) { return 0; }
        else if ((playerVal == "ROCK" && computerVal == "SCISSORS") || (playerVal == "SCISSORS" && computerVal == "PAPER") || (playerVal == "PAPER" && computerVal == "ROCK")) { return 1; }
        else { return -1; }
    }

    const decision = (playerChoice: string) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"];
        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        const val = logic(playerChoice, compChoice)
        if (val == 1) {
            console.log("Hello")
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
            setPlayerScore(playerScore + 1);
        } else if (val == -1) {
            console.log("Hello")
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
            setCompScore(compScore + 1);
        } else {
            console.log("Hello")
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
        }
    }

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "740px", textAlign: "center", borderRadius: "10px", padding: "20px", }}>
            <Typography variant="h1" sx={{ fontSize: "2rem", marginBottom: "20px", textTransform: "uppercase",}}>Welcome to Rock, Paper, Scissors Game</Typography>
            <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Button
                    variant="contained"
                    onClick={() => decision("ROCK")}
                    startIcon={<IconHandGrab size={30} />}
                    sx={{ backgroundColor: `${customColors[0]} !important`, margin: "0 10px", padding: "10px 20px", fontSize: "1.5rem", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease", }}
                >
                    Rock
                </Button>
                <Button
                    variant="contained"
                    onClick={() => decision("ROCK")}
                    startIcon={<IconHandStop size={30} />}
                    sx={{ backgroundColor: `${customColors[2]} !important`, margin: "0 10px", padding: "10px 20px", fontSize: "1.5rem", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease", }}
                >
                    Paper
                </Button>
                <Button
                    variant="contained"
                    onClick={() => decision("ROCK")}
                    startIcon={<IconHandTwoFingers size={30} />}
                    sx={{ backgroundColor: `${customColors[4]} !important`,  margin: "0 10px", padding: "10px 20px", fontSize: "1.5rem", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s ease", }}
                >
                    Scissors
                </Button>
            </Box>
            <Box>
                <Typography variant="h5" sx={{ marginBottom: "10px",  fontWeight: "bold", letterSpacing: "1px", }}>Your choice: {playerVal}</Typography>
                <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold", letterSpacing: "1px",}}>Computer's choice: {computerVal}</Typography>
                <Typography variant="h2" sx={{ marginBottom: "10px",  fontWeight: "bold", letterSpacing: "1px",}}>Your Score: {playerScore}</Typography>
                <Typography variant="h2">Computer Score: {compScore}</Typography>
            </Box>
        </Box>
    );
};

export default RockPaperScissorsGame;