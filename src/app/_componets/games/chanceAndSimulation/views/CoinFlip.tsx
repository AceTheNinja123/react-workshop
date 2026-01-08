import CoinFlipFunction from "@/app/_componets/gamesComponets/coinFlip/CoinFilp";
import React from "react";
import { Box } from "@mui/material";
const CoinFlip = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <CoinFlipFunction />
        </Box>
    );
}
export default CoinFlip; 