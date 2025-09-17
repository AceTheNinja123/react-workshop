"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import CandlestickChart from "@/app/_componets/amCharts/other/CandlestickChart"

const CandlestickChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <CandlestickChart />
        </Box>
    );
}
export default CandlestickChartLayout; 