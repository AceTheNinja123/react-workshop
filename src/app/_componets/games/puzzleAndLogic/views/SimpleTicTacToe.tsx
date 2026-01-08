import SimpleTicTacToeGameFunction from "@/app/_componets/gamesComponets/simpleTicTacToe/SimpleTicTacToe";
import React from "react";
import { Box,  } from "@mui/material";
const SimpleTicTacToeGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <SimpleTicTacToeGameFunction />
        </Box>
    );
}
export default SimpleTicTacToeGame; 