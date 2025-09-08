import React, { useEffect, useState } from "react";
import RandomPokemonFunction from "@/app/_componets/pokemon/RandomPokemon";
import { Box } from "@mui/material";
interface RandPokemonProps { reloadKey: number; }
const RandPokemon = ({ reloadKey }: RandPokemonProps) => {
    const [internalKey, setInternalKey] = useState(0);

    useEffect(() => {
        setInternalKey(prev => prev + 1);
    }, [reloadKey]);
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height:'740px',overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
            {[...Array(3)].map((_, index) => (
                <Box key={index} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center' }}>
                    {[...Array(2)].map((_, index) => (<RandomPokemonFunction key={index} shuffleTrigger={internalKey} />))}
                </Box>
            ))}
        </Box>
    );
};
export default RandPokemon;