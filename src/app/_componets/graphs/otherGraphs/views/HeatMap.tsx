"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import HeatMapChart from "@/app/_componets/amCharts/other/HeatMap"

const HeatMapLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <HeatMapChart />
        </Box>
    );
}
export default HeatMapLayout; 