import React from "react";
import { Box } from "@mui/material";
import MemeGeneratorFunction from "@/app/_componets/dashboardComponets/memeGenerator/MemeGenerator";
const MemeGenerator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <MemeGeneratorFunction/>
        </Box >
    );
};

export default MemeGenerator;