"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";

interface Drum { image: string; audio: string; }

const drums: Drum[] = [
    { image: "/images/drumKit/kick.png", audio: "/sounds/drumKit/kick-bass.mp3" },
    { image: "/images/drumKit/snare.png", audio: "/sounds/drumKit/snare.mp3" },
    { image: "/images/drumKit/crash.png", audio: "/sounds/drumKit/crash.mp3" },
    { image: "/images/drumKit/tom1.png", audio: "/sounds/drumKit/tom-1.mp3" },
    { image: "/images/drumKit/tom3.png", audio: "/sounds/drumKit/tom-3.mp3" },
    { image: "/images/drumKit/tom4.png", audio: "/sounds/drumKit/tom-4.mp3" },
    { image: "/images/drumKit/tom2.png", audio: "/sounds/drumKit/tom-2.mp3" },
];

const DrumKit = () => {
    const playAudio = (sound: string) => {
        console.log("Playing sound:", sound);
        const audio = new Audio(sound);
        audio.play().catch((err) => console.error("Audio playback failed:", err));
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}        >
            {drums.map((drum, index) => (
                <Button
                    key={index}
                    onClick={() => playAudio(drum.audio)}
                    sx={{
                        outline: "none",
                        border: "10px solid #404B69",
                        fontSize: "5rem",
                        fontFamily: "'Arvo', cursive",
                        lineHeight: 2,
                        fontWeight: 900,
                        color: "#DA0463",
                        textShadow: "3px 0 #DBEDF3",
                        borderRadius: "15px",
                        width: "200px",
                        height: "250px",
                        textAlign: "center",
                        m: 1,
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                >
                    <Image src={drum.image} alt={`Drum ${index + 1}`} width={100} height={100} />
                </Button>
            ))}
        </Box>
    );
};

export default DrumKit;