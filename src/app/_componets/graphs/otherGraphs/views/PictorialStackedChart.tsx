"use client"
import React from "react";
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"

//layout
import PictorialStackedChart from "@/app/_componets/amCharts/other/PictorialStackedChart"

interface dataType { value: number; category: string; }

//Svg Path
const svgPath1 = "M560 64c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h15.98v384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53.02 42.98-96 96-96s96 42.98 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z"
const svgPath2 = "M17 19h2v-8h-6v8h2v-6h2v6zM3 19V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2H2v-2h1zm4-8v2h2v-2H7zm0 4v2h2v-2H7zm0-8v2h2V7H7z"
// const svgPath3 = "M9 19h3v-6.058L8 9.454l-4 3.488V19h3v-4h2v4zm12 2H3a1 1 0 0 1-1-1v-7.513a1 1 0 0 1 .343-.754L6 8.544V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1zm-5-10v2h2v-2h-2zm0 4v2h2v-2h-2zm0-8v2h2V7h-2zm-4 0v2h2V7h-2z"
//Data
const roomOccupancyData: Array<dataType> = [{ value: 120, category: "Standard Room" }, { value: 90, category: "Deluxe Room" }, { value: 70, category: "Suite" }, { value: 50, category: "Family Room" }, { value: 30, category: "Executive Suite" },];
const servicesUsageData: Array<dataType> = [{ value: 150, category: "Room Service" }, { value: 130, category: "Spa" }, { value: 100, category: "Gym" }, { value: 90, category: "Pool" }, { value: 80, category: "Laundry" }, { value: 60, category: "Restaurant" },];
// const reviewsData: Array<dataType> = [{ value: 200, category: "5 Stars" }, { value: 150, category: "4 Stars" }, { value: 80, category: "3 Stars" }, { value: 40, category: "2 Stars" }, { value: 20, category: "1 Star" },];

const PictorialStackedChartLayout = () => {
    return (
        <Box sx={{ height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg:12, xl: 12 }}>
                    <PictorialStackedChart div="PSChartDiv1" svgPath={svgPath1} data={roomOccupancyData} name="Room Occupancy" />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg:12, xl: 12 }}>
                    <PictorialStackedChart div="PSChartDiv2" svgPath={svgPath2} data={servicesUsageData} name="Services Usage" />
                </Grid>
                {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg:12, xl: 12 }}>
                    <PictorialStackedChart div="PSChartDiv3" svgPath={svgPath3} data={reviewsData} name="Reviews" />
                </Grid> */}
            </Grid>
        </Box>
    );
}
export default PictorialStackedChartLayout; 