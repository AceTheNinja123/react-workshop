"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import TwoFacesClock from "@/app/_componets/amCharts/other/TwoFacesClock"

const TwoFacesClockChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <TwoFacesClock />
        </Box>
    );
}
export default TwoFacesClockChartLayout;