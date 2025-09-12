"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import DivergentStackedBarsChart from "@/app/_componets/amCharts/column/DivergentStackedBarsChart"

const DivergentStackedBarsChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <DivergentStackedBarsChart />
        </Box>
    );
}
export default DivergentStackedBarsChartLayout; 