"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import GenreWordCloud from "@/app/_componets/amCharts/wordcloud/GenreWordCloud"

const GenreWordCloudLayout = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <GenreWordCloud />
        </Box>
    );
}
export default GenreWordCloudLayout; 