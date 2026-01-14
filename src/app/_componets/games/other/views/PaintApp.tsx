import PaintAppFunction from "@/app/_componets/gamesComponets/paintApp/PaintApp";
import React from "react";
import { Box } from "@mui/material";
const PaintApp = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <PaintAppFunction />
        </Box>
    );
}
export default PaintApp; 