import React from "react";
import { Box } from "@mui/material";
import StackVisualizerFunction from "@/app/_componets/dashboardComponets/stackVisualizer/StackVisualizer";
const StackVisualizer = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <StackVisualizerFunction/>
        </Box >
    );
};

export default StackVisualizer;