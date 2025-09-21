import WordGuessGameFunction from "@/app/_componets/wordGuessGame/WordGuessGame";
import React from "react";
import { Box, useTheme } from "@mui/material";
const WordGuessGame = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <WordGuessGameFunction />
        </Box>
    );
}
export default WordGuessGame; 