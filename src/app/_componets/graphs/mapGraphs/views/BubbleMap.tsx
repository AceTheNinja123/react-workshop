"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import BubbleMap from "@/app/_componets/amCharts/map/BubbleMap"

const BubbleMapLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <BubbleMap />
        </Box>
    );
}
export default BubbleMapLayout; 