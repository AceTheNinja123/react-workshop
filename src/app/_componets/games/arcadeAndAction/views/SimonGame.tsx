import SimonGameFunction from "@/app/_componets/gamesComponets/simonGame/SimonGame";
import React from "react";
import { Box } from "@mui/material";
const SimonGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <SimonGameFunction />
        </Box>
    );
}
export default SimonGame; 