"use client"
import React from "react";
import { Box, } from "@mui/material"

//layout
import ImagesColumnChart from "@/app/_componets/amCharts/column/ImagesColumnChart"
//interface
const MovieRatingLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ImagesColumnChart />
        </Box>
    );
}
export default MovieRatingLayout; 