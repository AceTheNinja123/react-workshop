"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import StepLineChart from "@/app/_componets/graphsComponets/line/StepLineChart"

const StepLineChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <StepLineChart />
        </Box>
    );
}
export default StepLineChartLayout;