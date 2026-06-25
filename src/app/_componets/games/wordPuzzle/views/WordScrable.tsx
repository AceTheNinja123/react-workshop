import WordScrableFunction from "@/app/_componets/gamesComponets/wordScrable/WordScrable";
import React from "react";
import { Box } from "@mui/material";
const WordScrable = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <WordScrableFunction />
        </Box>
    );
}
export default WordScrable; 