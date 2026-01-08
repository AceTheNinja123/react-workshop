import TilePuzzleGameFunction from "@/app/_componets/gamesComponets/tilePuzzleGame/Game";
import React from "react";
import { Box } from "@mui/material";
const TilePuzzleGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <TilePuzzleGameFunction />
        </Box>
    );
}
export default TilePuzzleGame; 