import TenziesGameFunction from "@/app/_componets/gamesComponets/tenziesGame/TenziesGame";
import React from "react";
import { Box,  } from "@mui/material";
const TenziesGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <TenziesGameFunction />
        </Box>
    );
}
export default TenziesGame; 