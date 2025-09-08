"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import PolygonMap from "@/app/_componets/amCharts/map/PolygonMap"

const PolygonMapLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <PolygonMap />
        </Box>
    );
}
export default PolygonMapLayout; 