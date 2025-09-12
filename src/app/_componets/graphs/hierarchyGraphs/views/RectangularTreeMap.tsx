"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import RectangularTreeMap from "@/app/_componets/amCharts/hierarchy/RectangularTreeMap"

const RectangularTreeMapLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <RectangularTreeMap />
        </Box>
    );
}
export default RectangularTreeMapLayout; 