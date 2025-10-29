import React, { useState, } from 'react';
import { Box, Typography, Button, } from "@mui/material";
import Coin from './Coin'
import { IconUserFilled, IconCurrencyDollar } from "@tabler/icons-react";
/* Taken inspiration from this: https://www.geeksforgeeks.org/reactjs/create-a-coin-flipping-app-using-reactjs/ */

interface CoinFace { side: string; imgSrc?: string; icon?: React.ElementType; }
// const coins1: CoinFace[] = [
//     { side: 'head', imgSrc: 'https://media.geeksforgeeks.org/wp-content/uploads/20200916123059/SHalfDollarObverse2016head-300x300.jpg' },
//     { side: 'tail', imgSrc: 'https://media.geeksforgeeks.org/wp-content/uploads/20200916123125/tails-200x200.jpg' }
// ]

const coins2: CoinFace[] = [
    { side: 'head', icon: IconUserFilled },
    { side: 'tail', icon: IconCurrencyDollar }
]

const CoinFlip = () => {
    const [currFace, setCurrFace] = useState<CoinFace | null>(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [heads, setHeads] = useState(0);
    const [tails, setTails] = useState(0);

    const displayText = "Let's Flip a Coin";
    // Function takes array of different faces of a coin and return a random chosen single face
    function choice(arr: CoinFace[]) {
        const randomIdx = Math.floor(Math.random() * arr.length)
        return arr[randomIdx]
    }

    // Function responsible to update the states according to users interactions
    function flipCoin() {
        const newFace = choice(coins2)
        setCurrFace(newFace)
        setTotalFlips(prev => prev + 1)
        if (newFace.side === 'head') { setHeads(prev => prev + 1) }
        else { setTails(prev => prev + 1) }
    };

    function handleClick() {
        flipCoin();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h1" sx={{ fontSize: "2rem", marginBottom: "20px", textTransform: "uppercase", }}>{displayText}</Typography>
            {/* If current face exist then show current face */}
            {currFace && <Coin face={currFace} />}
            {!currFace && <Box sx={{ width: "200px", height: "200px", margin:2,}}/>}
            {/* Button to flip the coin  */}
            <Button variant="contained" onClick={handleClick} sx={{ fontSize: "1.5rem", marginBottom: "10px",}}>Flip Me!</Button>
            <Typography variant="body1" sx={{ fontSize: "1.5rem", }}>Out of {totalFlips} flips, there have been {heads} heads and {tails} tails</Typography>
        </Box>
    );
};
export default CoinFlip;