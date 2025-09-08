"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import LineAndLegendChart from "@/app/_componets/amCharts/line/LineAndLegend"

const LineAndLegendLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <LineAndLegendChart />
        </Box>
    );
}
export default LineAndLegendLayout; 