"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import ShapedBulletChart from "@/app/_componets/amCharts/line/ShapedBulletChart";

const ShapedBulletChartLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ShapedBulletChart />
        </Box>
    );
}
export default ShapedBulletChartLayout; 