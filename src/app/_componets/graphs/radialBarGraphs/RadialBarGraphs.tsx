"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import SalesRadarLayout from "./views/SalesRadar"
import SolidGaugeLayout from "../radialBarGraphs/views/SolidGauge";

//interface
const RadialBarGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Sales Radar Chart" subHeader="View the sales data distribution" >
            <SalesRadarLayout/>
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Solid Gauge" subHeader="View the company's performance">
            <SolidGaugeLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default RadialBarGraphs; 