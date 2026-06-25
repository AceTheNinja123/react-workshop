/**
 * AvatarGenerator.tsx
 *
 * This component provides an interface for generating random avatars using the DiceBear API.
 * Users can select different avatar styles (sprites) and generate new random avatars.
 * It also includes functionality to download the generated avatar as an SVG file.
 *
 * Features:
 * - Select from various avatar sprite types (e.g., Human, Pixel, Bots, Shapes, Identicon, Emoji, Avatars).
 * - Generate a new random avatar based on the selected sprite type.
 * - Display the generated avatar image.
 * - Download the generated avatar as an SVG file.
 *
 * Dependencies:
 * - React: For building the user interface.
 * - @mui/material: For UI components like Box, Typography, Button, and styled utility.
 * - next/image: For optimized image rendering.
 * - axios: For making HTTP requests to download the SVG image.
 *
 * Usage:
 * This component can be integrated into a larger application, typically within a dashboard or a creative tools section.
 * Taken inspiration from this: https://www.geeksforgeeks.org/reactjs/how-to-create-an-avatar-generator-app-in-reactjs/
 * Example:
 * ```jsx
 * <AvatarGenerator />
 * ```
 */

"use client";
import React, { useState } from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import Image from "next/image";
import Axios from 'axios';

// Styled buttons
const StyledButton = styled(Button)(() => ({
    width: "6em",
    height: "2.5em",
    margin: "10px",
    fontSize: "20px",
    fontWeight: 600,
    fontFamily: "'Roboto Mono', monospace",
    backgroundColor: "rgb(231, 231, 231)",
    boxShadow: "2px 3px 5px rgb(102, 101, 101)",
    borderRadius: "15px",
    border: "none",
    transition: "0.2s",
    "&:hover": { backgroundColor: "rgb(200, 200, 200)", boxShadow: "1px 2px 4px rgb(90, 89, 89)", transform: "scale(1.05)", },
    "&:active": { boxShadow: "none" },
}));

const AvatarGenerator = () => {

    // Setting up the initial states using react hook 'useState'
    const [sprite, setSprite] = useState("bottts");
    const [seed, setSeed] = useState(1000);

    // Function to set the current sprite type
    function handleSprite(spritetype: string) {
        setSprite(spritetype);
    }

    // Function to generate random seeds for the API
    function handleGenerate() {
        const x = Math.floor(Math.random() * 1000);
        setSeed(x);
    }

    // Function to download image and save it in our computer
    function downloadImage() {
        Axios({ method: "get", url: `https://api.dicebear.com/9.x/${sprite}/svg?seed=${seed}`, responseType: "arraybuffer" })
            .then((response) => {
                const link = document.createElement("a") as HTMLAnchorElement;
                link.href = window.URL.createObjectURL(new Blob([response.data], { type: "application/octet-stream" }));
                link.download = `${seed}.svg`;
                document.body.appendChild(link);
                link.click();
                setTimeout(function () { window.URL.revokeObjectURL(link.href); }, 200);
            })
            .catch((error) => { console.log(error); });
    }


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2, width: "100%" }} >
            <Box sx={{ height: "6vh", width: "100%", backgroundColor: "#313442", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontFamily: `'Zen Tokyo Zoo', cursive`, fontSize: "35px", }}>
                <Typography variant="h6" color="primary" sx={{ fontFamily: `'Lobster', cursive`, fontSize: '40px', padding: '20px' }}>Random Avatar Generator</Typography>
            </Box>
            <Box sx={{ boxSizing: "border-box", height: "94vh", width: "100%", gap: "15px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", }}>
                    <StyledButton onClick={() => { handleSprite("avataaars") }}>Human</StyledButton>
                    <StyledButton onClick={() => { handleSprite("pixel-art") }}>Pixel</StyledButton>
                    <StyledButton onClick={() => { handleSprite("bottts") }}>Bots</StyledButton>
                    <StyledButton onClick={() => { handleSprite("shapes") }}>Shapes</StyledButton>
                    <StyledButton onClick={() => { handleSprite("identicon") }}>Identi</StyledButton>
                    <StyledButton onClick={() => { handleSprite("fun-emoji") }}>Emoji</StyledButton>
                    <StyledButton onClick={() => { handleSprite("micah") }}>Avatars</StyledButton>
                </Box>
                <Box sx={{ height: "50%", width: "50%", maxWidth: "400px", maxHeight: "400px", marginTop: "20px", marginBottom: "45px", }}>
                    <Image id="img" src={`https://api.dicebear.com/9.x/${sprite}/svg?seed=${seed}`} alt="Sprite" width={400} height={400} unoptimized />
                </Box>
                <Box sx={{ gap: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", }}>
                    <Button id="gen" color="info" variant="contained" onClick={() => { handleGenerate() }}>Next</Button>
                    <Button id="down" color="error" variant="contained" onClick={() => { downloadImage() }}>Download</Button>
                </Box>
            </Box>
        </Box >
    );
};
export default AvatarGenerator;