"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import ChordDiagram from "@/app/_componets/amCharts/other/ChordDiagram"

const ChordDiagramLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ChordDiagram />
        </Box>
    );
}
export default ChordDiagramLayout; 