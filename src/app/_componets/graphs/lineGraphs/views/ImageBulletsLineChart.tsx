"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import ImageBulletsLineChart from "@/app/_componets/amCharts/line/ImageBulletsLineChart";

const ImageBulletsLineChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ImageBulletsLineChart />
        </Box>
    );
}
export default ImageBulletsLineChartLayout; 