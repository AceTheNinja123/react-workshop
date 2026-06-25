import TapTheIconFunction from "@/app/_componets/gamesComponets/tapTheIcon/TapTheIcon";
import React from "react";
import { Box,  } from "@mui/material";
const TapTheIcon = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <TapTheIconFunction />
        </Box>
    );
}
export default TapTheIcon; 