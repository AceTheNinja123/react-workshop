"use client"
import React from "react";
import { Box } from "@mui/material"

//layout
import MovingColumnChart from "@/app/_componets/amCharts/column/MovingColumnChart"
//interface
const MovingColumnChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <MovingColumnChart />
        </Box>
    );
}
export default MovingColumnChartLayout; 