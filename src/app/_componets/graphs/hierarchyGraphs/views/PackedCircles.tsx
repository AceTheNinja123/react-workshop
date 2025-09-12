"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import PackedCircles from "@/app/_componets/amCharts/hierarchy/PackedCircles"

const PackedCirclesLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <PackedCircles />
        </Box>
    );
}
export default PackedCirclesLayout; 