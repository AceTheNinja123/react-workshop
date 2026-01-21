"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import Dictionary from "./views/Dictionary";
import RecipeFinder from "./views/RecipeFinder";
import MovieSearch from "./views/MovieSearch";
import CountryInformation from "./views/CountryInformation";
//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Dictionary" subHeader="Search for definitions of words" >
            <Dictionary />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Recipe Finder" subHeader="Find recipes based on ingredients" >
            <RecipeFinder />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Country Information" subHeader="Search for country information" >
            <CountryInformation />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Movie Search" subHeader="Search for movies and get details" >
            <MovieSearch />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard; 