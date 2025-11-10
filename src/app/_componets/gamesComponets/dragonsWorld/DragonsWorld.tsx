import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";

/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/design-dragons-world-game-using-html-css-and-javascript/ */

const animateObstacle = keyframes` 0% { left: 100vw; } 100% { left: -10vw; }`;
const animateDragon = keyframes` 0% { bottom: 0; } 10% { bottom: 200px; } 20% { bottom: 250px; } 30% { bottom: 300px; } 40% { bottom: 350px; } 50% { bottom: 400px; } 60% { bottom: 350px; } 70% { bottom: 300px; } 80% { bottom: 250px; } 90% { bottom: 200px; } 100% { bottom: 0; } `;

const DragonsWorld = () => {
    const theme = useTheme();
    const [score, setScore] = useState(0);
    const [jumping, setJumping] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [obstacleSpeed, setObstacleSpeed] = useState(5);
    const [obstacleKey, setObstacleKey] = useState(0);
    const cross = useRef(true);
    const dragonRef = useRef<HTMLDivElement | null>(null);
    const obstacleRef = useRef<HTMLDivElement | null>(null);
    const title = "Welcome to Dragon's World";

    // 🟢 START GAME
    const handleStart = () => {
        setScore(0);
        setGameOver(false);
        setObstacleSpeed(5);
        setObstacleKey(prev => prev + 1);
        requestAnimationFrame(() => setGameStarted(true));

        const dragon = dragonRef.current;
        if (dragon) {
            dragon.style.left = "40px";
            dragon.style.bottom = "5px";
        }
    };

    // 🎮 Handle Player Movement (W, A, D)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameStarted || gameOver) return;

            const dragon = dragonRef.current;
            if (!dragon) return;

            if (["w", "a", "d"].includes(e.key.toLowerCase())) { e.preventDefault(); }

            if (e.key.toLowerCase() === "w" && !jumping) {
                setJumping(true);
                setTimeout(() => setJumping(false), 700);
            }

            if (["a", "d"].includes(e.key.toLowerCase())) {
                const currentLeft = parseInt(getComputedStyle(dragon).getPropertyValue("left"));
                const moveBy = 50;
                const newLeft = e.key.toLowerCase() === "a" ? Math.max(0, currentLeft - moveBy) : Math.min(600, currentLeft + moveBy);
                dragon.style.left = `${newLeft}px`;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [jumping, gameOver, gameStarted]);

    // ⚔️ Collision Detection
    useEffect(() => {
        const checkCollision = setInterval(() => {
            if (!gameStarted || gameOver) return;

            const dragon = dragonRef.current;
            const obstacle = obstacleRef.current;

            if (dragon && obstacle) {
                const dx = parseInt(getComputedStyle(dragon).getPropertyValue("left"));
                const dy = parseInt(getComputedStyle(dragon).getPropertyValue("bottom"));
                const ox = parseInt(getComputedStyle(obstacle).getPropertyValue("left"));
                const oy = parseInt(getComputedStyle(obstacle).getPropertyValue("bottom"));

                const offsetX = Math.abs(dx - ox);
                const offsetY = Math.abs(dy - oy);

                // 💥 Collision
                if (offsetX < 120 && offsetY < 100) {
                    setGameOver(true);
                    setGameStarted(false);
                    obstacle.style.animation = "none";
                    return;
                }

                // ✅ Successful pass (increase score)
                if (offsetX < 150 && cross.current) {
                    setScore((prev) => prev + 1);
                    cross.current = false;
                    setTimeout(() => (cross.current = true), 1000);

                    // Increase difficulty
                    const newSpeed = Math.max(1.5, obstacleSpeed - 0.1);
                    setObstacleSpeed(newSpeed);
                }
            }
        }, 10);

        return () => clearInterval(checkCollision);
    }, [gameOver, gameStarted, obstacleSpeed]);

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: "center" }}> {title} </Typography>

            <Box sx={{ background: "url('/images/dragonsWorld/fantasyLandscape.png') center center / cover no-repeat", width: 800, height: 600, position: "relative", overflow: "hidden", borderRadius: "20px", border: "3px solid #4caf50", boxShadow: "0 0 20px rgba(0,0,0,0.4)", }}>
                {/* SCORE */}
                {gameStarted && !gameOver && (
                    <Box sx={{ position: "absolute", top: 20, right: 20, background: "rgba(0,0,0,0.7)", padding: "10px 20px", borderRadius: "10px", color: "white", }}>
                        <Typography variant="h6">Score: {score}</Typography>
                    </Box>
                )}

                {/* OVERLAY: Start / Game Over */}
                {!gameStarted && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: gameOver ? "firebrick" : "rgba(0,0,0,0.7)",
                            color: "white",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            padding: "30px 40px",
                            borderRadius: "20px",
                            textAlign: "center",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                        }}
                    >
                        <Typography variant="h3" sx={{ mb: 2 }}>{gameOver ? "Game Over!" : "Press Start to Play"}</Typography>
                        <Button
                            variant="contained"
                            color={gameOver ? "secondary" : "primary"}
                            onClick={handleStart}
                            sx={{ fontWeight: "bold", backgroundColor: gameOver ? "gold" : theme.palette.primary.main, color: gameOver ? "black" : "white", "&:hover": { backgroundColor: gameOver ? "#ffd700" : theme.palette.primary.dark }, }}
                        >
                            {gameOver ? "Restart Game" : "Start Game"}
                        </Button>
                    </Box>
                )}

                {/* OBSTACLE (Orange Dragon) */}
                <Box
                    key={obstacleKey}
                    ref={obstacleRef}
                    sx={{
                        background: "url('/images/dragonsWorld/orangeDragon.png') center center / contain no-repeat",
                        width: 194,
                        height: 126,
                        position: "absolute",
                        bottom: 5,
                        left: "100vw",
                        animation: gameStarted ? `${animateObstacle} ${obstacleSpeed}s linear infinite` : "none",
                    }}
                />


                {/* PLAYER (Blue Dragon) */}
                <Box
                    ref={dragonRef}
                    sx={{
                        background: "url('/images/dragonsWorld/blueDragon.png') center center / contain no-repeat",
                        width: 194,
                        height: 126,
                        position: "absolute",
                        bottom: 5,
                        left: 40,
                        animation: jumping ? `${animateDragon} 1.4s linear` : "none",
                    }}
                />
            </Box>
        </Box>
    );
};
export default DragonsWorld;