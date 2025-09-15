"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import SalesRadarLayout from "./views/SalesRadar"
import SolidGaugeLayout from "../radialBarGraphs/views/SolidGauge";
import InteractiveRadarLayout from "./views/InteractiveRadar"
import PolarAreaChartLayout from "./views/PolarAreaChart"
//interface
const RadialBarGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Sales Radar Chart" subHeader="View the sales data distribution" >
            <SalesRadarLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Solid Gauge" subHeader="View the company's performance">
            <SolidGaugeLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Interactive Radar Chart" subHeader="Answer and view data about life">
            <InteractiveRadarLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Polar Area Chart" subHeader="View groceries popularity through the year">
            <PolarAreaChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default RadialBarGraphs; 