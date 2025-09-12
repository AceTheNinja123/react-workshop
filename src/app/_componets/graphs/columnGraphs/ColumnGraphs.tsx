"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import MovieRatingLayout from "./views/MovieRating";
import MovingColumnChartLayout from "./views/MovingColumnChart";
import ImagesColumnChartLayout from "./views/ImagesColumnChart";
import PartitionedBarChartLayout from "./views/PartitionedBarChart";
import DivergentStackedBarsChartLayout from "./views/DivergentStackedBarsChart";

//interface
const ColumnGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Movie Rating" subHeader="View the rating of the movies" >
            <MovieRatingLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Hotel Room Checkout" subHeader="View the number of hotel room checkouts" >
            <MovingColumnChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Visitor Statistics" subHeader="A column chart showing the amount of visitors from different countries" >
            <ImagesColumnChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Partitioned Bar Chart" subHeader="A partitioned bar chart showing movie ratings" >
            <PartitionedBarChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Divergent Stacked Bars Chart" subHeader="View the service rating at a restaurant">
            <DivergentStackedBarsChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default ColumnGraphs; 