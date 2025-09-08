import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import DiceFunction from "@/app/_componets/dice/Dice";
import Grid from "@mui/material/Grid";
import RollAgainButton from "@/app/_componets/shared/button/RollAgainButton";

const DiceRoll = () => {
    const [diceData, setDiceData] = useState<Array<{ dice: number[]; color: string }> | null>(null);
    const theme = useTheme();
    const getRandomColor = () => { return theme.palette.customColors[Math.floor(Math.random() * theme.palette.customColors.length)]; }
    const getRandomDice = () => [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    useEffect(() => {
        if (diceData === null || diceData.length === 0) {
            setDiceData(Array.from({ length: 4 }, () => ({ dice: getRandomDice(), color: getRandomColor() })));
        }
    }, []);

    const handleReload = (index: number) => {
        setDiceData(prev =>
            prev && prev.map((item, i) => i === index ? { dice: getRandomDice(), color: getRandomColor() } : item)
        );
    };
    const rollAgainButton = (index: number) => (<RollAgainButton onClick={() => handleReload(index)} />);

    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <Grid container spacing={4} sx={{ height: '750px', width: '100%', alignItems: 'center', justifyItems: 'center' }}>
                {diceData && diceData.map((item, index) => (
                    <Grid className='Dice' size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} key={index}>
                        <DiceFunction dice={item.dice} color={item.color} />
                        {rollAgainButton(index)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DiceRoll;