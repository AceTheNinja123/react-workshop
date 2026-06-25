"use client"
import React from "react";
import { Box } from "@mui/material"

//layout
import PartitionedBarChart from "@/app/_componets/graphsComponets/column/PartitionedBarChart"
//interface
const PartitionedBarLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <PartitionedBarChart />
        </Box>
    );
}
export default PartitionedBarLayout; 