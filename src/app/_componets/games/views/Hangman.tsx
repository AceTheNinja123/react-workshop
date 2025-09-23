import HangmanGameFunction from "@/app/_componets/gamesComponets/hungman/HangmanGame";
import React from "react";
import { Box,  } from "@mui/material";
const HangmanGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <HangmanGameFunction />
        </Box>
    );
}
export default HangmanGame; 