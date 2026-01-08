import WordGuessGameFunction from "@/app/_componets/gamesComponets/wordGuessGame/WordGuessGame";
import React from "react";
import { Box } from "@mui/material";
const WordGuessGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <WordGuessGameFunction />
        </Box>
    );
}
export default WordGuessGame; 