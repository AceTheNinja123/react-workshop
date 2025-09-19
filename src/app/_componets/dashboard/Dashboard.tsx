"use client"
import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import ColorBoxes from "@/app/_componets/dashboard/views/ColorBoxes";
import DiceRolls from "@/app/_componets/dashboard/views/DiceRolls";
import RandPokemon from "@/app/_componets/dashboard/views/RandPokemon";
import MuiSwiperCarousel from "@/app/_componets/dashboard/views/MuiSwiperCarousel";
import MondrianPainting from "@/app/_componets/dashboard/views/MondarianPanting";
import PostWordCount from "@/app/_componets/dashboard/views/PostWordCount";
import Calculator from "@/app/_componets/dashboard/views/Calculator";
import WordGuessGame from "@/app/_componets/dashboard/views/WordGuessGame";
//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

//Buttons
import ShuffleButton from "../shared/button/ShuffleButton";

const Dashboard = () => {
  const [RandPokemonReloadKey, setRandPokemonReloadKey] = useState(0);

  const handleReload = () => {
    setRandPokemonReloadKey(prev => prev + 1);
  };
  const shuffleButton = () => (<ShuffleButton onClick={handleReload} />);
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Color Boxes" subHeader="Click on the boxes to change their colors!" >
            <ColorBoxes />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Dice Rolls" subHeader="Click on the button to roll the dice again!" >
            <DiceRolls />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Random Pokemon" subHeader="Click to get new ones!" buttons={shuffleButton()} >
            <RandPokemon reloadKey={RandPokemonReloadKey} />
          </ParentCardWithButtonAndSubheading>
        </Grid>
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
          <ParentCardWithButtonAndSubheading title="Word Guess Game" subHeader="Try and guess the word" >
            <WordGuessGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Dashboard; 