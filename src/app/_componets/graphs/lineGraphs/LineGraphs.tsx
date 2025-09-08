"use client"
import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import LineAndLegendLayout from "./views/LineAndLegend"
import SmoothedStackedAreaChartLayout from "./views/SmoothedStackedArea"
//interface
const LineGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Line Chart" subHeader="Shows service at a hotel restaurant" >
            <LineAndLegendLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Smoothed Stacked Area Chart" subHeader="Shows different flower sales over the years" >
            <SmoothedStackedAreaChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default LineGraphs; 