"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import BubbleMapLayout from "./views/BubbleMap";
import PolygonMapLayout from "./views/PolygonMap";
import MotionChartAndPolygonMapLayout from "./views/MotionChartAndPolygonMap";
//interface
const MapGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Bubble Map Chart" subHeader="Total response by country" >
            <BubbleMapLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Polygon Map Chart" subHeader="Total response by country" >
            <PolygonMapLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Motion Chart and Polygon Map" subHeader="View hypothetical metric from 1925 to 2025" >
            <MotionChartAndPolygonMapLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default MapGraphs; 