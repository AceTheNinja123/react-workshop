"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props { shuffleTrigger: number; }

export default function RandomPokemonFunction({ shuffleTrigger }: Props) {
  const [pokeNum, setPokeNum] = useState(1);

  useEffect(() => {
    const random = Math.floor(Math.random() * 151) + 1;
    setPokeNum(random);
  }, [shuffleTrigger]); // Re-run when shuffle changes

  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;

  return (
    <div className="RandomPokemon">
      <h1>Pokemon: #{pokeNum}</h1>
      <Image src={url} alt={`Pokemon #${pokeNum}`} width={200} height={200} />
    </div>
  );
}