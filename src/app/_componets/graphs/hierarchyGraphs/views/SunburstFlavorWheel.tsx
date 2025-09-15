"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import SunburstFlavorWheel from "@/app/_componets/amCharts/hierarchy/SunburstFlavorWheel"

const SunburstFlavorWheelLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <SunburstFlavorWheel />
        </Box>
    );
}
export default SunburstFlavorWheelLayout;