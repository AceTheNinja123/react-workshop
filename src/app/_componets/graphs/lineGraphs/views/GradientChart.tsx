"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import GradientChart from "@/app/_componets/amCharts/line/GradientChart"

const GradientChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <GradientChart />
        </Box>
    );
}
export default GradientChartLayout; 