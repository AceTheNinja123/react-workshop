"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//View Pages
import RandomQuoteGenerator from "./views/RandomQuoteGenerator";
import ColourPaletteGenerator from "./views/ColourPaletteGenerator";
import AiImageGenerator from "./views/AiImageGenerator";
import JokeGenerator from "./views/JokeGenerator";
import AvatarGenerator from "./views/AvatarGenerator";
import MemeGenerator from "./views/MemeGenerator";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
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
          <ParentCardWithButtonAndSubheading title="Avatar Generator" subHeader="Generate random avatars" >
            <AvatarGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Meme Generator" subHeader="Generate your own memes" >
            <MemeGenerator />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard; 