"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import SalesAndExpensesLayout from "./views/SalesAndExpenses";
import MotionChartAndPolygonMapLayout from "./views/MotionChartAndPolygonMap";
import VerticallyStackedAxesLayout from "./views/VerticallyStackedAxes";
//interface
const LineGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Sales And Expenses" subHeader="View the sales and expenses" >
            <SalesAndExpensesLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Motion Chart and Polygon Map" subHeader="View hypothetical metric from 1925 to 2025" >
            <MotionChartAndPolygonMapLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Vertically Stacked Axes" subHeader="View Vertically Stacked Axes" >
            <VerticallyStackedAxesLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default LineGraphs; 