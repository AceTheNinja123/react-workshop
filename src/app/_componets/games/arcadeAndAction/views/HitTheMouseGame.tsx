import HitTheMouseGameFunction from "@/app/_componets/gamesComponets/hitTheMouseGame/HitTheMouseGame";
import React from "react";
import { Box } from "@mui/material";
const HitTheMouseGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <HitTheMouseGameFunction />
        </Box>
    );
}
export default HitTheMouseGame; 