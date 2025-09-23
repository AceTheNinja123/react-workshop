"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import PolarAreaChart from "@/app/_componets/graphsComponets/radialbar/PolarAreaChart"

const PolarAreaChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <PolarAreaChart />
        </Box>
    );
}
export default PolarAreaChartLayout;