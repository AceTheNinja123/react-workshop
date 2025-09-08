"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";
import GenreWordCloudLayout from "./views/GenreWordCloud";
import SentenceCloudLayout from "./views/HotelCommentSentenceCloud";
//interface
const WordCloudGraphs = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Genre Word Cloud" subHeader="View the what genre is most watched" >
            <GenreWordCloudLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Hotel Comment Cloud" subHeader="View the most common comments about the hotel" >
            <SentenceCloudLayout />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box >
  );
}
export default WordCloudGraphs; 