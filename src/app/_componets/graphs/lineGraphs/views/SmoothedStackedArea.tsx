"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import SmoothedStackedAreaChart from "@/app/_componets/amCharts/line/SmoothedStackedArea"

const SmoothedStackedAreaChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <SmoothedStackedAreaChart />
        </Box>
    );
}
export default SmoothedStackedAreaChartLayout; 