"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import RadialGradientDonutChart from "@/app/_componets/amCharts/donut/RadialGradientDonutChart"

const RadialGradientDonutChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <RadialGradientDonutChart />
        </Box>
    );
}
export default RadialGradientDonutChartLayout; 