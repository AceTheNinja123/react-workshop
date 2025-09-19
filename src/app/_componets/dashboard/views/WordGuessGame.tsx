import WordGuessGameFunction from "@/app/_componets/wordGuessGame/WordGuessGame";
import React from "react";
import { Box, useTheme } from "@mui/material";
const WordGuessGame = () => {
    const theme = useTheme();
    return (
        <Box sx={{width: '100%', display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <WordGuessGameFunction />
        </Box>
    );
}
export default WordGuessGame; 