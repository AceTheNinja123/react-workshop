
/**
 * DrumKit Component
 * 
 * A interactive drum kit component that displays drum buttons with images and plays audio sounds when clicked.
 * Each drum pad shows an image background and plays the corresponding audio file on user interaction.
 * 
 * @component
 * @returns {JSX.Element} A responsive grid layout of drum pad buttons
 * 
 * @example
 * ```tsx
 * <DrumKit />
 * ```
 * 
 * Features:
 * - 7 different drum sounds (Kick, Snare, Crash, Tom 1-4)
 * - Visual feedback on hover
 * - Error handling for audio playback failures
 * - Responsive flexbox layout
 * - Themed styling using Material-UI
 * 
 * @remarks
 * - Audio playback errors are caught and logged to console
 * - Each drum has a key, image path, and audio file path
 * - Uses Material-UI Button component with custom styling
 * - Requires audio files at `/sounds/drumKit/` and images at `/images/drumKit/`
 */
"use client";
import React, { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

interface Drum { key: string; letter: string; image: string; audio: string; }
const drums: Drum[] = [
    { key: "Kick", letter: "l", image: "/images/drumKit/kick.png", audio: "/sounds/drumKit/kick-bass.mp3" },
    { key: "Snare", letter: "k", image: "/images/drumKit/snare.png", audio: "/sounds/drumKit/snare.mp3" },
    { key: "Crash", letter: "j", image: "/images/drumKit/crash.png", audio: "/sounds/drumKit/crash.mp3" },
    { key: "Tom 1", letter: "w", image: "/images/drumKit/tom1.png", audio: "/sounds/drumKit/tom-1.mp3" },
    { key: "Tom 3", letter: "a", image: "/images/drumKit/tom3.png", audio: "/sounds/drumKit/tom-3.mp3" },
    { key: "Tom 4", letter: "s", image: "/images/drumKit/tom4.png", audio: "/sounds/drumKit/tom-4.mp3" },
    { key: "Tom 2", letter: "d", image: "/images/drumKit/tom2.png", audio: "/sounds/drumKit/tom-2.mp3" },
];

const DrumKit = () => {
    const theme = useTheme();
    const playAudio = (sound: string) => {
        console.log("Playing sound:", sound);
        const audio = new Audio(sound);
        audio.play().catch((err) => console.error("Audio playback failed:", err));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const keyPressed = e.key.toLowerCase();
            const drum = drums.find((d) => d.letter.toLowerCase() === keyPressed);
            if (drum) { playAudio(drum.audio); }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => { window.removeEventListener("keydown", handleKeyDown); };
    }, []);

    return (
        <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}        >
            {drums.map((drum) => (
                <Button
                    key={drum.key}
                    onClick={() => playAudio(drum.audio)}
                    sx={{
                        outline: "none",
                        border: "10px solid #404B69",
                        fontSize: "5rem",
                        fontFamily: "'Arvo', cursive",
                        lineHeight: 2,
                        fontWeight: "bold",
                        color: "#000",
                        textShadow: `3px 0 ${theme.palette.primary.main}`,
                        borderRadius: "15px",
                        width: "200px",
                        height: "250px",
                        textAlign: "center",
                        m: 1,
                        p: 2,
                        backgroundColor: "white",
                        backgroundImage: `url(${drum.image})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                >
                    <Typography variant="h1">{drum.key}</Typography>
                </Button>
            ))}
        </Box>
    );
};

export default DrumKit;