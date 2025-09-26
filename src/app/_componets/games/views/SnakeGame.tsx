import SnakeGameFunction from "@/app/_componets/gamesComponets/snakeGame/SnakeGame";
import React from "react";
import { Box,  } from "@mui/material";
const SnakeGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <SnakeGameFunction />
        </Box>
    );
}
export default SnakeGame; 