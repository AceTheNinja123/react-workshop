import PingPongGameFunction from "@/app/_componets/gamesComponets/pingPongGame/PingPongGame";
import React from "react";
import { Box,  } from "@mui/material";
const PingPongGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <PingPongGameFunction />
        </Box>
    );
}
export default PingPongGame; 