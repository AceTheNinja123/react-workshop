"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import FavouriteColours from "@/app/_componets/amCharts/donut/FavColoursDonutChart"

const FavColoursLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <FavouriteColours />
        </Box>
    );
}
export default FavColoursLayout; 