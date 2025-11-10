"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import MuiSwiperCarousel from "./views/MuiSwiperCarousel";
import MondrianPainting from "./views/MondrianPainting";
import PostWordCount from "./views/PostWordCount";
import Calculator from "./views/Calculator";
import RandomQuoteGenerator from "./views/RandomQuoteGenerator";
import ColourPaletteGenerator from "./views/ColourPaletteGenerator";
import Dictionary from "./views/Dictionary";
import AiImageGenerator from "./views/AiImageGenerator";
import JokeGenerator from "./views/JokeGenerator";
import AgeCalculator from "./views/AgeCalculator";
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
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Mui And Swiper Carousel" subHeader="Carousel display for Images" >
            <MuiSwiperCarousel />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Post Word Count" subHeader="Counts the characters being put in" >
            <PostWordCount />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Calculator" subHeader="Calculat the numbers you need" >
            <Calculator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Random Quote Generator" subHeader="Click button to get a random quote" >
            <RandomQuoteGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Colour Palette Generator" subHeader="Click button to generat a new colour palette. You can search for colours or copy the HEX." >
            <ColourPaletteGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Dictionary" subHeader="Search for definitions of words" >
            <Dictionary />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="AI Image Generator" subHeader="Enter a description below and generate an AI-related image." >
            <AiImageGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Joke Generator" subHeader="Click button to get a random joke" >
            <JokeGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Age Calculator" subHeader="Enter dates calculate the age" >
            <AgeCalculator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard; 