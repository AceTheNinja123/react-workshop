
/**
 * Games component - A collection of interactive game components
 * 
 * Displays a responsive grid of various games and interactive activities.
 * Games include: Color Boxes, Dice Rolls, Random Pokemon, Word Guess Game,
 * Rock Paper Scissors, 15 Puzzle, Memory Game, Hangman, Snake Game, Coin Flip,
 * Quiz Game, Drum Kit, Crack The Code, Tap The Icon, Word Scrabble,
 * Hit The Mouse Game, Dragons World, and Simple Tic-Tac-Toe.
 * 
 * The Random Pokemon game includes a shuffle button to reload the Pokemon list.
 * 
 * @component
 * @returns {JSX.Element} A Box containing a responsive Grid layout with game cards
 * 
 * @example
 * // Usage in a parent component
 * <Games />
 * 
 * @remarks
 * - Uses Material-UI Grid for responsive layout (mobile-first design)
 * - Each game is wrapped in a ParentCardWithButtonAndSubheading component
 * - Only Random Pokemon currently has an interactive shuffle button
 * - Flappy Bird and Ping Pong games are commented out due to performance issues
 * - This is a client-side component ("use client")
 */
"use client"
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages

import WordGuessGame from "./views/WordGuessGame";
import Hangman from "./views/Hangman";
import WordScrable from "./views/WordScrable";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

const Games = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Word Guess Game" subHeader="Try and guess the word" >
            <WordGuessGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Hangman Game" subHeader="Win by guessing the word before the hangman is complete." >
            <Hangman />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Word Scrable" subHeader="Play the Word Scrable game" >
            <WordScrable />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Games; 