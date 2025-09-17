"use client"
import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import LineAndLegendLayout from "./views/LineAndLegend";
import SmoothedStackedAreaChartLayout from "./views/SmoothedStackedArea";
import StepLineChartLayout from "./views/StepLineChart";
import AreaChartLayout from "./views/AreaChart";
import GradientChart from "./views/GradientChart";
import ImageBulletsLineChartLayout from "./views/ImageBulletsLineChart";
import ShapedBulletChartLayout from "./views/ShapedBulletChart";
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
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Step Line Chart" subHeader="Shows steps in service over time" >
            <StepLineChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Area Chart" subHeader="View the company's sales summery">
            <AreaChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="GradientChart" subHeader="View amount of likes over the same month each year">
            <GradientChart />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Image Bullets Line Chart" subHeader="View monsters growth over the years">
            <ImageBulletsLineChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Shaped Bullet Chart" subHeader="View comparsion between hobbies and age groups">
            <ShapedBulletChartLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default LineGraphs; 