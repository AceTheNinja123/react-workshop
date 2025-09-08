"use client"
import React from "react";
import { Box } from "@mui/material"
//layout
import ColumnAndLineChart from "@/app/_componets/amCharts/groupCharts/ColumnAndLineChart"

const SalesAndExpensesLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ColumnAndLineChart />
        </Box>
    );
}
export default SalesAndExpensesLayout; 