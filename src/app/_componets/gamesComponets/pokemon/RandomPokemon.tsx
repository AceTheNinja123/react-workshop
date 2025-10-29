"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography, } from "@mui/material";

interface Props { shuffleTrigger: number; }

export default function RandomPokemonFunction({ shuffleTrigger }: Props) {
  const [pokeNum, setPokeNum] = useState(1);

  useEffect(() => {
    const random = Math.floor(Math.random() * 151) + 1;
    setPokeNum(random);
  }, [shuffleTrigger]); // Re-run when shuffle changes

  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', margin: '5px', border: '2px solid gray', width: '300px', borderRadius: '20px', }}    >
      <Typography variant="h5" gutterBottom>Pokemon: #{pokeNum}</Typography>
      <Image src={url} alt={`Pokemon #${pokeNum}`} width={200} height={200} />
    </Box>
  );
}