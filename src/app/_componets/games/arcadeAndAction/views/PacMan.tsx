import PacManFunction from "@/app/_componets/gamesComponets/pacMan/PacMan";
import React from "react";
import { Box,  } from "@mui/material";
const PacMan = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <PacManFunction />
        </Box>
    );
}
export default PacMan; 