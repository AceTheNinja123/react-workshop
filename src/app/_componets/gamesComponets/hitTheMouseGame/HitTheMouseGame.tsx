
/**
 * HitTheMouseGame Component
 * 
 * An interactive game where users click on randomly appearing mice to increase their score.
 * The game features a custom hammer cursor that animates on click, and mice that pop up from holes.
 * 
 * @component
 * @returns {React.ReactElement} A game board with 5 holes, score display, start/stop controls, and animated hammer cursor
 * 
 * @example
 * return <HitTheMouseGame />
 * 
 * @remarks
 * - Game board displays 5 holes where mice randomly appear
 * - Mice appear for 700ms before disappearing
 * - Score increases by 1 for each successful hit
 * - Custom hammer cursor follows mouse movement and animates on click
 * - Game only runs when "START" button is clicked
 * - Inspired by: https://www.geeksforgeeks.org/javascript/design-hit-the-mouse-game-using-html-css-and-vanilla-javascript/
 * 
 * @state {number} score - Current player score
 * @state {boolean} isRunning - Whether the game is currently active
 * @state {number | null} activeHole - Index of the hole with an active mouse, or null
 * @state {Object} hammerPos - Current hammer cursor position with x and y coordinates
 * @state {boolean} hammerHitAnim - Whether hammer hit animation is active
 * @state {boolean} isInside - Whether mouse is inside the game board area
 */
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { keyframes } from "@emotion/react";
import Image from "next/image";

// Animations
const ratPop = keyframes`  from { bottom: -60px; }  to { bottom: 0; }`;
const hammerHit = keyframes`  from { transform: rotate(0deg); }  to { transform: rotate(-40deg); }`;

// Styled buttons
const StyledButton = styled(Button)(() => ({
    padding: "15px 45px",
    border: "inherit",
    borderRadius: "4px",
    fontSize: "1.5em",
    fontWeight: 900,
    outline: "none",
}));

const HitTheMouseGame = () => {
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [hammerPos, setHammerPos] = useState({ x: 0, y: 0 });
    const [hammerHitAnim, setHammerHitAnim] = useState(false);
    const gameInterval = useRef<NodeJS.Timeout | null>(null);
    const [isInside, setIsInside] = useState(false);


    // Handle mouse move for hammer
    useEffect(() => {
        const handleMove = (e: MouseEvent) => { setHammerPos({ x: e.pageX, y: e.pageY }); };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    // Handle hammer click animation
    useEffect(() => {
        const handleClick = () => {
            setHammerHitAnim(true);
            setTimeout(() => setHammerHitAnim(false), 100);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    // Start game loop
    const startGame = () => {
        setIsRunning(true);
        setScore(0);
        if (gameInterval.current) clearInterval(gameInterval.current);

        gameInterval.current = setInterval(() => {
            const randomHole = Math.floor(Math.random() * 5);
            setActiveHole(randomHole);

            // Reset after 700ms
            setTimeout(() => setActiveHole(null), 700);
        }, 800);
    };

    // Stop game
    const stopGame = () => {
        setIsRunning(false);
        setActiveHole(null);
        if (gameInterval.current) clearInterval(gameInterval.current);
    };

    // Handle hit detection
    const handleHit = (index: number) => {
        if (isRunning && index === activeHole) {
            setScore((prev) => prev + 1);
            setActiveHole(null); // Remove rat after hit
        }
    };

    return (
        <Box sx={{ width: "100%", height: "100%", color: "white", backgroundColor: "#4caf50", }} onMouseEnter={() => setIsInside(true)} onMouseLeave={() => setIsInside(false)}>
            {/* Header */}
            <Typography variant="h2" sx={{ textAlign: "center", fontFamily: "'Dancing Script', cursive", mt: 2 }}>Hit the Mouse</Typography>

            {/* Score */}
            <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "'Dancing Script', cursive", mb: 2 }} >Points: {score}</Typography>

            {/* Game board */}
            <Box sx={{ width: 600, height: 400, display: "flex", flexWrap: "wrap", margin: "0 auto", position: "relative", cursor: "none", }} >
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => handleHit(i)}
                        sx={{
                            flex: "1 0 33.33%",
                            overflow: "hidden",
                            position: "relative",
                            "&::after": {
                                display: "block",
                                background: "url('/images/hitTheMouse/hide3.png') bottom center no-repeat",
                                backgroundSize: "contain",
                                content: "''",
                                width: "100%",
                                height: "70px",
                                position: "absolute",
                                zIndex: 20,
                                bottom: "-2px",
                            },
                        }}
                    >
                        {activeHole === i && (
                            <Box
                                component="img"
                                src="/images/hitTheMouse/mouse.png"
                                alt="mouse"
                                sx={{
                                    position: "absolute",
                                    height: "10vh",
                                    bottom: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    animation: `${ratPop} 0.5s linear`,
                                    zIndex: 10,
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>

            {/* Buttons */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                {!isRunning ? (<StyledButton onClick={startGame}>START</StyledButton>) : (<StyledButton onClick={stopGame}>STOP</StyledButton>)}
            </Box>

            {/* Hammer Cursor */}
            {isInside && (
                <Box
                    sx={{
                        position: "absolute",
                        top: hammerPos.y,
                        left: hammerPos.x,
                        transform: "translate(-20px, -50px)",
                        pointerEvents: "none",
                        zIndex: 40, height: 125,
                        animation: hammerHitAnim ? `${hammerHit} 0.1s ease` : "none",
                    }}
                >
                    <Image src="/images/hitTheMouse/hammer.png" alt="hammer" width={125} height={125} />
                </Box>
            )}
        </Box>
    );
};

export default HitTheMouseGame;