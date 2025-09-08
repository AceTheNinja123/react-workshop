"use client"
import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material"

//layout
import PartitionedBarChart from "@/app/_componets/amCharts/column/PartitionedBarChart"
//interface
interface dataType { category: string; y: number; name: string; }
const PartitionedBarLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <PartitionedBarChart />
        </Box>
    );
}
export default PartitionedBarLayout; 