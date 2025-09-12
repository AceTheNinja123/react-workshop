"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import ForceDirectedTree from "@/app/_componets/amCharts/hierarchy/ForceDirectedTree"

const ForceDirectedTreeLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ForceDirectedTree />
        </Box>
    );
}
export default ForceDirectedTreeLayout; 