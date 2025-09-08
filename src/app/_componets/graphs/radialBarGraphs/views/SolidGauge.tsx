"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import SolidGaugeChart from "@/app/_componets/amCharts/radialbar/SolidGauge";

const SolidGaugeLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <SolidGaugeChart />
        </Box>
    );
}
export default SolidGaugeLayout; 