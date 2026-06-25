import DrumKitFunction from "@/app/_componets/gamesComponets/drumKit/DrumKit";
import React from "react";
import { Box } from "@mui/material";
const DrumKit = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <DrumKitFunction />
        </Box>
    );
}
export default DrumKit; 