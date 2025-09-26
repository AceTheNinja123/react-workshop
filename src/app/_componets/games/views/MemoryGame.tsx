import MemoryGameFunction from "@/app/_componets/gamesComponets/memoryGame/GameBoard";
import React from "react";
import { Box } from "@mui/material";
const MemoryGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <MemoryGameFunction />
        </Box>
    );
}
export default MemoryGame; 