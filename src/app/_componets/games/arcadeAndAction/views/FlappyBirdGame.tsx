import FlappyBirdGameFunction from "@/app/_componets/gamesComponets/flappyBirdGame/FlappyBirdGame";
import React from "react";
import { Box } from "@mui/material";
const FlappyBirdGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <FlappyBirdGameFunction />
        </Box>
    );
}
export default FlappyBirdGame; 