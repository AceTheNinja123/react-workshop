import React from "react";
import { Box } from "@mui/material";
import AgeCalculatorFunction from "@/app/_componets/dashboardComponets/ageCalculator/AgeCalculator";
const AgeCalculator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <AgeCalculatorFunction/>
        </Box >
    );
};

export default AgeCalculator;