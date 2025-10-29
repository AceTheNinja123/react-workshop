"use client";
import React, { useState } from "react";
import { Box, Typography, Button, TextField, useTheme, IconButton, Dialog } from "@mui/material";
import Image from "next/image";
import { IconArrowsMaximize, IconArrowsMinimize, IconDownload, IconPhoto, } from "@tabler/icons-react";

/* Taken inspiration from this: https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev and https://www.geeksforgeeks.org/javascript/build-an-ai-image-generator-website-in-html-css-and-javascript/ */
const examplePrompts = ["A futuristic cityscape at sunset, with flying cars and neon lights", "A serene forest with a crystal-clear river flowing through it", "A majestic dragon soaring over snow-capped mountains",]

const AiImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [statusText, setStatusText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    const theme = useTheme();
    const mode = theme.palette.mode;
    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setStatusText("⚠️ Please enter a description first.");
            return;
        }

        setLoading(true);
        setStatusText("⏳ Generating image...");

        try {
            const response = await fetch("/api/huggingFace", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (!response.ok) { setStatusText(data.err.message || "❌ Failed to generate image"); }
            if (data.imageUrl) {
                setImageUrl(data.imageUrl);
                setStatusText("✅ Image generated successfully!");
            }
        } catch (error) {
            console.error(error);
            setStatusText("❌ Something went wrong.");
        } finally { setLoading(false); }
    };

    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "ai-generated-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2, width: "100%" }} >
            {/* Heading */}
            <Typography variant="h3" color='primary' sx={{ mb: 1 }}>AI Image Generator</Typography>
            <Typography variant="subtitle1" sx={{ mb: 4 }}>Enter a short description and generate an AI image.</Typography>

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleGenerate}
                sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2, justifyContent: "center", mb: 4, width: "60%" }}
            >
                <TextField color="primary" fullWidth multiline label="Enter a prompt..." variant="standard" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1 }} disabled={loading}> Generate</Button>
            </Box>
            {/* Example Prompts */}
            <Box sx={{ display: "flex", gap: 1, width: "100%", alignItems: "center", justifyContent: "center", flexWrap: "wrap", }}>
                {examplePrompts.map((example, index) => (
                    <Box
                        key={index}
                        onClick={() => setPrompt(example)}
                        sx={{ p: 1, border: "1px solid", borderColor: mode === "dark" ? "#fff" : "#000", borderRadius: "4px", cursor: "pointer", "&:hover": { backgroundColor: "action.hover" }, alignItems: "center", justifyContent: "center", }}
                    >
                        <Typography variant="body1">{example}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Empty Image */}
            {!imageUrl && (
                <Box sx={{ width: 500, height: 500, borderRadius: "10px", border: "1px solid", borderColor: mode === "dark" ? "#fff" : "#000", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}                >
                    {statusText ? (<Typography variant="h6" sx={{ margin: 10 }}>{statusText}</Typography>) : (<IconPhoto size={100} color={theme.palette.primary.main} />)}
                </Box>
            )}

            {/* Display Image */}
            {imageUrl && (
                <Box sx={{ position: "relative", display: "flex", justifyContent: "center", mt: 2, }}>
                    <Image
                        src={imageUrl}
                        alt="AI Generated"
                        width={500}
                        height={500}
                        loading="lazy"
                        unoptimized
                        style={{ borderRadius: "10px", objectFit: "cover", border: "1px solid", borderColor: mode === "dark" ? "#fff" : "#000", boxShadow: "0 0 10px rgba(0,0,0,0.3)", }}
                    />
                    {/* Control Buttons */}
                    <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "8px", p: 0.5, }}>
                        <IconButton onClick={() => setIsMaximized(true)} color="inherit"><IconArrowsMaximize color="white" /></IconButton>
                        <IconButton onClick={handleDownload} color="inherit"><IconDownload color="white" /></IconButton>
                    </Box>
                </Box>
            )}

            {/* Maximized Image Dialog */}
            <Dialog open={isMaximized} onClose={() => setIsMaximized(false)} maxWidth="lg" slotProps={{ paper: { sx: { backgroundColor: "transparent", boxShadow: "none" }, }, }}            >
                <Box sx={{ position: "relative" }}>
                    <Image
                        src={imageUrl}
                        alt="Maximized AI Generated"
                        width={800}
                        height={800}
                        unoptimized
                        style={{ borderRadius: "10px", objectFit: "contain", boxShadow: "0 0 20px rgba(0,0,0,0.6)", }}
                    />
                    <IconButton onClick={() => setIsMaximized(false)} sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.6)" }}><IconArrowsMinimize color="white" /></IconButton>
                    <IconButton onClick={handleDownload} sx={{ position: "absolute", top: 10, right: 60, backgroundColor: "rgba(0,0,0,0.6)" }}><IconDownload color="white" /></IconButton>
                </Box>
            </Dialog>
        </Box>
    );
};
export default AiImageGenerator;