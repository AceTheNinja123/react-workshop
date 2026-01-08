
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
import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
//View Pages
import DiceRolls from "./views/DiceRolls";
import RandPokemon from "./views/RandPokemon";
import RockPaperScissorsGame from "./views/RockPaperScissorsGame";
import CoinFlip from "./views/CoinFlip";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

//Buttons
import ShuffleButton from "../../shared/button/ShuffleButton";

const Games = () => {
  //For RandPokemon
  const [RandPokemonReloadKey, setRandPokemonReloadKey] = useState(0);
  const handleReload = () => { setRandPokemonReloadKey(prev => prev + 1); };
  const shuffleButton = () => (<ShuffleButton onClick={handleReload} />);

  return (
    <Box>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
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
          <ParentCardWithButtonAndSubheading title="Rock Paper Scissors Game" subHeader="Play against the computer" >
            <RockPaperScissorsGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Coin Flip" subHeader="Flip a coin for heads or tail!" >
            <CoinFlip />
          </ParentCardWithButtonAndSubheading>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Games; 