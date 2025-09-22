import TilePuzzleGameFunction from "@/app/_componets/tilePuzzleGame/Game";
import React from "react";
import { Box, useTheme } from "@mui/material";
const TilePuzzleGame = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <TilePuzzleGameFunction />
        </Box>
    );
}
export default TilePuzzleGame; 