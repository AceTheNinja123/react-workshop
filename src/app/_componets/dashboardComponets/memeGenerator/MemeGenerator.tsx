/**
 * MemeGenerator.tsx
 *
 * This component provides an interface for generating memes.
 * Users can input top and bottom text, and then generate a random meme image
 * from the imgflip API with the text overlaid. The text is draggable.
 *
 * Features:
 * - Input fields for top and bottom meme text.
 * - Generates a random meme image from a predefined list.
 * - Overlays the input text onto the generated meme image.
 * - Draggable text on the meme image.
 * - Responsive font size for the meme text.
 *
 * Dependencies:
 * - React: For building the user interface and managing state.
 * - @mui/material: For UI components like Box, Typography, Button, TextField, and styled utility.
 * - next/image: For optimized image rendering.
 *
 * Usage:
 * This component can be integrated into a larger application, typically within a dashboard or a creative tools section.
 * Example:
 * ```jsx
 * <MemeGenerator />
 * ```
 * 
 * inspiration taken from: https://www.geeksforgeeks.org/how-to-build-a-meme-generator-using-react-js/
 */

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, styled, TextField, useTheme } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
interface allMemeImgsType {
    box_count: number;
    captions: number;
    height: number;
    id: string;
    name: string;
    url: string;
    width: number;
}

// Styled Typography
const AnimatedText = styled(Typography)(() => ({
    position: "absolute",
    width: "90%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    textAutospace: "ideograph-alpha",
    fontFamily: "impact, sans-serif",
    lineHeight: 1,
    textTransform: "uppercase",
    color: "white",
    letterSpacing: "1px",
    textShadow: "2px 2px 0 #000",
    cursor: "grab",
    userSelect: "none",
    animation: "pop 0.4s ease-out",

    "@keyframes pop": {
        "0%": { transform: "translateX(-50%) scale(0.8)" },
        "100%": { transform: "translateX(-50%) scale(1)" },
    },
}));


const MemeGenerator = () => {

    // Setting up the initial states using react hook 'useState'
    const memeRef = useRef<HTMLDivElement>(null);

    const [fontSize, setFontSize] = useState(24);
    const [topPos, setTopPos] = useState(10);
    const [bottomPos, setBottomPos] = useState(10);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [allMemeImgs, setAllMemeImgs] = useState<allMemeImgsType[]>([]);
    const [randomImg, setRandomImg] = useState("");
    const theme = useTheme();

    // componentDidMount() method to fetch images from the API
    const componentDidMount = useCallback(() => {
        // Fetching data from the API
        fetch('https://api.imgflip.com/get_memes')
            // Converting the promise received into JSON
            .then(response => response.json())
            .then(content => setAllMemeImgs(content.data.memes))
    }, [setAllMemeImgs]);

    useEffect(() => {
        componentDidMount();
        if (!memeRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;
            setFontSize(Math.max(16, width / 20));
        });

        observer.observe(memeRef.current);
        return () => observer.disconnect();
    }, [componentDidMount]);

    // Method to change the value of input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Destructuring the event. target object
        const { name, value } = event.target
        if (name === "topText") { setTopText(value) }
        else if (name === "bottomText") { setBottomText(value) }
    }

    // Method to submit from and create meme
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
        console.log(rand);
        setRandomImg(rand);
    }
    // Function to make text draggable
    const makeDraggable =
        (setter: React.Dispatch<React.SetStateAction<number>>) =>
            (e: React.PointerEvent) => {
                const startY = e.clientY;
                const startValue = Number((e.target as HTMLElement).dataset.y);

                const move = (ev: PointerEvent) =>
                    setter(startValue + (ev.clientY - startY));

                const up = () => {
                    window.removeEventListener("pointermove", move);
                    window.removeEventListener("pointerup", up);
                };

                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
            };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2, width: "100%" }} >
            <Box>
                {/* // Controlled form */}
                <form className='meme-form' onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
                    {/* // Input field to get First text */}
                    <TextField placeholder='Enter Text' type='text' value={topText} name='topText' onChange={handleChange} />
                    {/* // Input field to get Last text */}
                    <TextField placeholder='Enter Text' type='text' value={bottomText} name='bottomText' onChange={handleChange} />
                    {/* // Button to generate meme */}
                    <Button type="submit">Generate</Button>
                </form>
            </Box>
            <Box
                ref={memeRef}
                sx={{
                    position: "relative",
                    width: "59%",
                    maxWidth: "500px",
                    aspectRatio: "1 / 1",
                    margin: "auto",
                    backgroundColor: theme.palette.primary.light,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                {randomImg && (
                    <>
                        <Image
                            src={randomImg}
                            alt="meme"
                            crossOrigin="anonymous"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />

                        {/* TOP TEXT */}
                        <AnimatedText sx={{ top: `${topPos}px`, fontSize }} data-y={topPos} onPointerDown={makeDraggable(setTopPos)}>{topText}</AnimatedText>

                        {/* BOTTOM TEXT */}
                        <AnimatedText sx={{ bottom: `${bottomPos}px`, fontSize }} data-y={bottomPos} onPointerDown={makeDraggable(setBottomPos)}>{bottomText}</AnimatedText>
                    </>
                )}
            </Box>
        </Box >
    );
};
export default MemeGenerator;