import React, { useState, useEffect, useCallback } from "react";
import { Box, FormControl, Select, MenuItem, Button, useTheme, Typography, } from "@mui/material";
import DiceFunction from "@/app/_componets/gamesComponets/dice/Dice";
import Grid from "@mui/material/Grid";
import RollAgainButton from "@/app/_componets/shared/button/RollAgainButton";
// 🎲 Dice types with sides and labels
const diceTypes = [
    { id: 1, sides: 4, label: "D4", type: 'ones' },
    { id: 2, sides: 6, label: "D6", type: 'ones' },
    { id: 3, sides: 8, label: "D8", type: 'ones' },
    { id: 4, sides: 10, label: "D10", type: 'ones' },
    { id: 5, sides: 10, label: "D10 (percentile)", type: 'tens' },
    { id: 6, sides: 12, label: "D12", type: 'ones' },
    { id: 7, sides: 20, label: "D20", type: 'ones' },
];

const DiceRoll = () => {
    const theme = useTheme();
    const colorOptions = theme.palette.customColors;
    const mode = theme.palette.mode;
    // 🎲 Dice Data
    const [diceData, setDiceData] = useState<Array<{ id: number; dice: number; sides: number, type: string, label: string }> | null>(null);
    // 🎨 Color state (selected or random)
    const [selectedColor, setSelectedColor] = useState<string>('');

    // 🎲 Get random number per die
    const getRandomDice = (sides: number, type: string) => {
        let newValue = 1;

        if (type === "ones") { newValue = Math.floor((Math.random() * sides) + 1); }
        else if (type === "tens") { newValue = Math.floor(Math.random() * sides) * 10; }

        return newValue;
    }

    // 🎨 Get random color from palette
    const getRandomColor = useCallback(() => {
        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        setSelectedColor(randomColor);
    }, [colorOptions]);

    // Initialize dice
    useEffect(() => {
        if (selectedColor === '') getRandomColor();
        if (!diceData) {
            setDiceData(
                diceTypes.map((d) => ({
                    id: d.id,
                    dice: getRandomDice(d.sides, d.type),
                    sides: d.sides,
                    type: d.type,
                    label: d.label,
                }))
            );
        }
    }, [diceData, selectedColor, colorOptions, getRandomColor]);

    // Roll again for a specific dice set
    const handleReload = (index: number) => {
        setDiceData((prev) =>
            prev?.map((item, i) => i === index ? { ...item, dice: getRandomDice(item.sides, item.type), color: selectedColor } : item) ?? null
        );
    };

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mt: 3, maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', justifyContent: 'center' }}>
            {/* 🎨 Color Selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Select Dice Color:</Typography>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    {colorOptions.length > 0 && (
                        <Select
                            value={colorOptions.includes(selectedColor) ? selectedColor : ""}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: 'center',
                                textAlign: 'start',
                                backgroundColor: selectedColor,
                                border: '1x solid',
                                borderColor: mode === 'dark' ? ' #fff !important' : ' #000 !important',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: mode === 'dark' ? '#fff !important' : '#000 !important',
                                },
                            }}
                        >
                            {colorOptions.map(color => (<MenuItem key={color} value={color} sx={{ backgroundColor: color, }}>{color}</MenuItem>))}
                        </Select>
                    )}
                </FormControl>

                {/* 🎲 Random Color Button */}
                <Button variant="contained" color="primary" onClick={() => getRandomColor()}>Random Color</Button>
            </Box>

            {/* 🎲 Dice Grid */}
            <Grid
                container
                spacing={4}
                sx={{ mt: 3, width: "100%", justifyContent: "center", alignItems: "center", }}
            >
                {diceData !== null && diceData?.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }} sx={{ textAlign: "center" }}                    >
                        <DiceFunction dice={item.dice} color={selectedColor} sides={item.sides} label={item.label} />
                        <RollAgainButton onClick={() => handleReload(index)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DiceRoll;