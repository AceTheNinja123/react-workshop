"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import InteractiveRadar from "@/app/_componets/amCharts/radialbar/InteractiveRadarChart"

const InteractiveRadarLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <InteractiveRadar />
        </Box>
    );
}
export default InteractiveRadarLayout;