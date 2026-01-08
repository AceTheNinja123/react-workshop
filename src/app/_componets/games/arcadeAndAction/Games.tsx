

"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import TapTheIcon from "./views/TapTheIcon";
import SnakeGame from "./views/SnakeGame";
import HitTheMouseGame from "./views/HitTheMouseGame";
import DragonsWorld from "./views/DragonsWorld";
import FlappyBirdGame from "./views/FlappyBirdGame";
import PingPongGame from "./views/PingPongGame";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Games = () => {

  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Snake Game" subHeader="Play a game of snake!" >
            <SnakeGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Tap The Icon" subHeader="Play the Tap The Icon game" >
            <TapTheIcon />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Hit The Mouse Game" subHeader="Play the Hit The Mouse game" >
            <HitTheMouseGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Dragons World" subHeader="Play the Dragons World game and avoid obstacles" >
            <DragonsWorld />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Flappy Bird Game" subHeader="Play a game of Flappy Bird!" >
            <FlappyBirdGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Ping Pong Game" subHeader="Play a game of ping pong!" >
            <PingPongGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Games; 