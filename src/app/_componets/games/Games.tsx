
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
import ColorBoxes from "./views/ColorBoxes";
import DiceRolls from "./views/DiceRolls";
import RandPokemon from "./views/RandPokemon";
import WordGuessGame from "./views/WordGuessGame";
import RockPaperScissorsGame from "./views/RockPaperScissorsGame";
import TilePuzzleGame from "./views/TilePuzzleGame";
import MemoryGame from "./views/MemoryGame";
import Hangman from "./views/Hangman";
import CoinFlip from "./views/CoinFlip";
import QuizGame from "./views/QuizGame";
import DrumKit from "./views/DrumKit";
import CrackTheCode from "./views/CrackTheCode";
import TapTheIcon from "./views/TapTheIcon";
import WordScrable from "./views/WordScrable";
import SnakeGame from "./views/SnakeGame";
import HitTheMouseGame from "./views/HitTheMouseGame";
import DragonsWorld from "./views/DragonsWorld";
import SimpleTicTacToe from "./views/SimpleTicTacToe";
//import FlappyBirdGame from "./views/FlappyBirdGame";
//import PingPongGame from "./views/PingPongGame";

//layout
import ParentCardWithButtonAndSubheading from "@/app/_componets/shared/ParentCardWithButtonAndSubheading";

//Buttons
import ShuffleButton from "../shared/button/ShuffleButton";

const Games = () => {
  //For RandPokemon
  const [RandPokemonReloadKey, setRandPokemonReloadKey] = useState(0);
  const handleReload = () => { setRandPokemonReloadKey(prev => prev + 1); };
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
          <ParentCardWithButtonAndSubheading title="Word Guess Game" subHeader="Try and guess the word" >
            <WordGuessGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Rock Paper Scissors Game" subHeader="Play against the computer" >
            <RockPaperScissorsGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="15 Puzzle Game" subHeader="Arrange all the tiles in numerical order with the rule that they can only move the tile that is a direct neighbor of the empty tile" >
            <TilePuzzleGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Memory Game" subHeader="Click and match up the right food tiles. Remember where they are." >
            <MemoryGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Hangman Game" subHeader="Win by guessing the word before the hangman is complete." >
            <Hangman />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Snake Game" subHeader="Play a game of snake!" >
            <SnakeGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Coin Flip" subHeader="Flip a coin for heads or tail!" >
            <CoinFlip />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Quiz Game" subHeader="Try the quiz out" >
            <QuizGame />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Drum Kit" subHeader="Play the drum kit" >
            <DrumKit />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Crack The Code" subHeader="Play the Crack The Code game" >
            <CrackTheCode />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Tap The Icon" subHeader="Play the Tap The Icon game" >
            <TapTheIcon />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Word Scrable" subHeader="Play the Word Scrable game" >
            <WordScrable />
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
          <ParentCardWithButtonAndSubheading title="Simple Tic-Tac-Toe" subHeader="Play the simple Tic-Tac-Toe" >
            <SimpleTicTacToe />
          </ParentCardWithButtonAndSubheading>
        </Grid>
        {/*Still in progress. It is slow and does not work properly*/}
        {/* <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Flappy Bird Game" subHeader="Play a game of Flappy Bird!" >
            <FlappyBirdGame />
          </ParentCardWithButtonAndSubheading>
        </Grid> */}
        {/* <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ alignItems: 'center' }}>
          <ParentCardWithButtonAndSubheading title="Ping Pong Game" subHeader="Play a game of ping pong!" >
            <PingPongGame />
          </ParentCardWithButtonAndSubheading>
        </Grid> */}
      </Grid>
    </Box>
  );
}
export default Games; 