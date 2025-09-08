"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import SentenceCloudCloud from "@/app/_componets/amCharts/wordcloud/SentenceCloud"

const SentenceCloudLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <SentenceCloudCloud />
        </Box>
    );
}
export default SentenceCloudLayout; 