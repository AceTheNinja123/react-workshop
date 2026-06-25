"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import MuiSwiperCarousel from "./views/MuiSwiperCarousel";
import MondrianPainting from "./views/MondrianPainting";
import StackVisualizer from "./views/StackVisualizer";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Mondrian Painting" subHeader="Using CSS grid to create" >
            <MondrianPainting />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <ParentCardWithButtonAndSubheading title="Mui And Swiper Carousel" subHeader="Carousel display for Images" >
              <MuiSwiperCarousel />
            </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Stack Visualizer" subHeader="Stack the blocks" >
            <StackVisualizer />
          </ParentCardWithButtonAndSubheading>
        </Grid>

      </Grid>
    </Box>
  );
}
export default Dashboard; 