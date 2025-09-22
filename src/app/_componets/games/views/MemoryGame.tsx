import MemoryGameFunction from "@/app/_componets/memoryGame/GameBoard";
import React from "react";
import { Box, useTheme } from "@mui/material";
const MemoryGame = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <MemoryGameFunction />
        </Box>
    );
}
export default MemoryGame; 