import RockPaperScissorsGameFunction from "@/app/_componets/gamesComponets/rockPaperScissorsGame/RockPaperScissorsGame";
import React from "react";
import { Box, useTheme } from "@mui/material";
const RockPaperScissorsGame = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <RockPaperScissorsGameFunction />
        </Box>
    );
}
export default RockPaperScissorsGame; 