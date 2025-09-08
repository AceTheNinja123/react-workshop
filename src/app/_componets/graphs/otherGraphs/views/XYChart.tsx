"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import XYChartChart from "@/app/_componets/amCharts/other/XYChart"

const XYChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <XYChartChart />
        </Box>
    );
}
export default XYChartLayout; 