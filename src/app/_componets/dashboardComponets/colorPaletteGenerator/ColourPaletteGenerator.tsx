/**
 * ColourPaletteGenerator Component
 * 
 * A React component that generates and displays a random color palette with search functionality.
 * Users can search for colors by name, copy color hex values to clipboard, and refresh the palette.
 * 
 * @component
 * @returns {React.ReactElement} A color palette generator interface with search, display grid, and refresh button
 * 
 * @example
 * return <ColourPaletteGenerator />
 * 
 * @remarks
 * - Generates 18 random hex colors on component mount
 * - Supports searching colors by predefined color names (red, green, blue, etc.)
 * - Displays "Copied" message when a color hex value is copied to clipboard
 * - Uses Material-UI components for styling and layout
 * - Inspired by: https://www.geeksforgeeks.org/javascript/how-to-create-a-stack-visualizer-using-html-css-javascript/
 */
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, InputAdornment, Grid } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

const ColourPaletteGenerator = () => {
    const [colourList, setColourList] = useState<Array<string | number>>([]);
    const [copiedColourIndex, setCopiedColourIndex] = useState<number | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [matchingColours, setMatchingColours] = useState<Array<string | number>>([]);
    const filteredColourList = matchingColours.length > 0 ? matchingColours : colourList;
    useEffect(() => { generateColourPalette(); }, []);

    const generateColourPalette = () => {
        const maxColourBoxes = 18;
        const tempColourList = [];

        for (let i = 0; i < maxColourBoxes; i++) {
            const randomHexColour = `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padStart(6, "0")}`;
            tempColourList.push(randomHexColour);
        }
        setCopiedColourIndex(null);
        setColourList(tempColourList);
    };

    const copyColourToClipboard = (hexValue: number | string, index: number) => {
        navigator.clipboard
            .writeText(String(hexValue))
            .then(() => { setCopiedColourIndex(index); })
            .catch(() => { alert("Failed to copy the colour code!"); });
    };

    interface ColourMapping { [key: string]: string[]; }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchInput: string = e.target.value.toLowerCase();

        // Colour mapping with arrays of related colours
        const colourMapping: ColourMapping = {
            red: ["#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500"],
            green: ["#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000"],
            blue: ["#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1"],
            yellow: ["#FFFF00", "#FFD700", "#FFEA00", "#F0E68C", "#FFAC33"],
            pink: ["#FFC0CB", "#FF69B4", "#FF1493", "#FF6EB4", "#FF82AB"],
            purple: ["#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF"],
            orange: ["#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500"],
            brown: ["#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887"],
            cyan: ["#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD"],
            magenta: ["#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4"],
            teal: ["#008080", "#008B8B", "#00FFFF", "#20B2AA", "#40E0D0"],
            navy: ["#000080", "#00008B", "#0000FF", "#4169E1", "#0000CD"],
            lime: ["#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F"],
            maroon: ["#800000", "#8B0000", "#B22222", "#A52A2A", "#800000"],
            olive: ["#808000", "#6B8E23", "#556B2F", "#8FBC8B", "#9ACD32"],
            silver: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#BEBEBE", "#A9A9A9"],
            black: ["#000000", "#080808", "#121212", "#1C1C1C", "#262626"],
            white: ["#FFFFFF", "#F5F5F5", "#FAFAFA", "#E0E0E0", "#D3D3D3"],
            // Add more colour mappings as needed
        };

        // Check if the search input matches any colour name
        const matchingColours: string[] = colourMapping[searchInput] || [];
        setSearchInput(searchInput);
        setMatchingColours(matchingColours);
    };
    return (
        <Box sx={{display: "flex",  flexDirection:"column", alignItems: "center", justifyItems: "center"}}>
            <Box sx={{ width: "300px", margin: "20px auto", position: "relative" }}>
                <TextField
                    type="text"
                    placeholder="Search for a colour"
                    value={searchInput}
                    onChange={handleSearchChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size={20}/>
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        width: "100%",
                        borderWidth: "2px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        outline: "none",
                    }}
                />
            </Box>
            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', }}>
                {filteredColourList.map((hexValue, index) => (
                    <Grid
                        key={index}
                        sx={{
                            marginTop: "12px",
                            //margin: "5px",
                            padding: "7px",
                            listStyle: "none",
                            cursor: "pointer",
                            textAlign: "center",
                            background: "#fff",
                            borderRadius: "16px",
                            transition: "all 0.3s ease",
                        }}
                        onClick={() => copyColourToClipboard(hexValue, index)}
                    >
                        <Box sx={{ width: "105px", height: "108px", borderRadius: "10px", backgroundColor: hexValue, "&:hover": { filter: "brightness(107%) " }, }} />
                        <Box sx={{ display: "block", color: "#444", userSelect: "none", fontWeight: "500", fontSize: "1.15rem", margin: "12px 0 8px", textTransform: "uppercase", }}>
                            <Typography sx={{ fontWeight: "500", fontSize: "1.15rem", }}>{hexValue}</Typography>
                            {copiedColourIndex === index && (
                                <Typography variant="body1" sx={{ margin: "10px", color: "crimson", fontWeight: "bold", fontFamily: "'Courier New', Courier, monospace", }}>Copied</Typography>
                            )}
                        </Box>

                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="success"
                onClick={generateColourPalette}
                sx={{
                marginTop: "10px",
                    color: "#fff",
                    cursor: "pointer",
                    outline: "none",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    borderRadius: "5px",
                    background: "green",
                    padding: "13px 20px",
                    border: "none",
                }}
            >
                Refresh Palette
            </Button>
        </Box>
    );
}
export default ColourPaletteGenerator;