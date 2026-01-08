/**
 * PingPongGame Component
 * 
 * A React component that implements an interactive Ping Pong game with two paddles and a moving ball.
 * 
 * @component
 * @returns {JSX.Element} A game container with paddles, ball, and control buttons
 * 
 * @example
 * return <PingPongGame />
 * 
 * @remarks
 * - Left paddle is controlled with W (up) and S (down) keys
 * - Right paddle is controlled with 8 (up) and 2 (down) keys
 * - The game ends when the ball goes out of bounds (left or right)
 * - Ball speed increases slightly with each paddle collision
 * - Inspired by GeeksforGeeks Ping Pong Game tutorial
 * 
 * @see https://www.geeksforgeeks.org/reactjs/ping-pong-game-using-react/
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
/* Taken inspiration from this:https://www.geeksforgeeks.org/reactjs/ping-pong-game-using-react/ */

const PingPongGame = () => {
    const theme = useTheme();
    const GAME_WIDTH = 600;
    const GAME_HEIGHT = 400;
    const PADDLE_HEIGHT = 60;
    const PADDLE_WIDTH = 10;
    const BALL_SIZE = 20;
    const INITIAL_SPEED = 5;

    // Game state stored in ref to avoid closure staleness and excessive re-renders during logic updates
    const gameState = useRef({
        ball: { x: 300, y: 200, speedX: INITIAL_SPEED, speedY: INITIAL_SPEED },
        paddles: { left: 150, right: 150 },
        score: { left: 0, right: 0 },
        isRunning: false,
        isGameOver: false
    });

    // Force re-render to update UI
    const [, setTick] = useState(0);
    const [mounted, setMounted] = useState(false);
    const keysPressed = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        setMounted(true);
        const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key] = false; };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            gameState.current.isRunning = false;
        };
    }, []);

    const gameLoop = useCallback(() => {
        if (!gameState.current.isRunning) return;

        const state = gameState.current;
        const paddleSpeed = 8; // Faster paddle movement

        // Update Paddles
        if (keysPressed.current["w"] || keysPressed.current["W"]) {
            state.paddles.left = Math.max(0, state.paddles.left - paddleSpeed);
        }
        if (keysPressed.current["s"] || keysPressed.current["S"]) {
            state.paddles.left = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, state.paddles.left + paddleSpeed);
        }
        if (keysPressed.current["8"] || keysPressed.current["ArrowUp"]) {
            state.paddles.right = Math.max(0, state.paddles.right - paddleSpeed);
        }
        if (keysPressed.current["2"] || keysPressed.current["ArrowDown"]) {
            state.paddles.right = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, state.paddles.right + paddleSpeed);
        }

        // Gradually increase ball speed
        const MAX_SPEED = 15;
        if (Math.abs(state.ball.speedX) < MAX_SPEED) state.ball.speedX *= 1.0005;
        if (Math.abs(state.ball.speedY) < MAX_SPEED) state.ball.speedY *= 1.0005;

        // Update Ball
        let newX = state.ball.x + state.ball.speedX;
        let newY = state.ball.y + state.ball.speedY;

        // Wall Collisions (Top/Bottom)
        if (newY <= 0) {
            newY = 0;
            state.ball.speedY = Math.abs(state.ball.speedY);
        } else if (newY >= GAME_HEIGHT - BALL_SIZE) {
            newY = GAME_HEIGHT - BALL_SIZE;
            state.ball.speedY = -Math.abs(state.ball.speedY);
        }

        // Paddle Collisions (Math-based instead of DOM-based)
        // Left Paddle (x=10 to 20)
        if (newX <= 10 + PADDLE_WIDTH && newX + BALL_SIZE >= 10) {
            if (newY + BALL_SIZE >= state.paddles.left && newY <= state.paddles.left + PADDLE_HEIGHT) {
                newX = 10 + PADDLE_WIDTH; // Push out
                state.ball.speedX = Math.abs(state.ball.speedX) + 0.5;
            }
        }

        // Right Paddle (x=580 to 590)
        if (newX + BALL_SIZE >= 580 && newX <= 580 + PADDLE_WIDTH) {
            if (newY + BALL_SIZE >= state.paddles.right && newY <= state.paddles.right + PADDLE_HEIGHT) {
                newX = 580 - BALL_SIZE; // Push out
                state.ball.speedX = -Math.abs(state.ball.speedX) - 0.5;
            }
        }

        // Scoring
        if (newX < 0) {
            state.score.right += 1;
            state.ball = { x: 300, y: 200, speedX: INITIAL_SPEED, speedY: INITIAL_SPEED };
        } else if (newX > GAME_WIDTH - BALL_SIZE) {
            state.score.left += 1;
            state.ball = { x: 300, y: 200, speedX: -INITIAL_SPEED, speedY: INITIAL_SPEED };
        } else {
            state.ball.x = newX;
            state.ball.y = newY;
        }

        // Check Win Condition (First to 5)
        if (state.score.left >= 5 || state.score.right >= 5) {
            state.isRunning = false;
            state.isGameOver = true;
        } else {
            requestAnimationFrame(gameLoop);
        }

        setTick(t => t + 1);
    }, []);

    const startGame = () => {
        if (gameState.current.isRunning) return;
        if (gameState.current.isGameOver) restartGame();
        gameState.current.isRunning = true;
        requestAnimationFrame(gameLoop);
    };

    const restartGame = () => {
        gameState.current = {
            ball: { x: 300, y: 200, speedX: INITIAL_SPEED, speedY: INITIAL_SPEED },
            paddles: { left: 150, right: 150 },
            score: { left: 0, right: 0 },
            isRunning: false,
            isGameOver: false
        };
        setTick(t => t + 1);
    };

    const pauseGame = () => { gameState.current.isRunning = false; };

    if (!mounted) return null;

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* Button controls */}
            <Box sx={{ margin: "10px", display: "flex", gap: "10px" }}>
                <Button variant="contained" color="primary" onClick={startGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Start</Button>
                <Button variant="contained" color="primary" onClick={pauseGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Pause</Button>
                <Button variant="contained" color="primary" onClick={restartGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Restart</Button>
            </Box>
            {/* Score Display */}
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                {gameState.current.score.left} - {gameState.current.score.right}
            </Typography>
            {/* Game area */}
            <Box sx={{ position: "relative", width: "600px", height: "400px", alignContent: "center", mx: "20px auto", border: "2px solid", borderColor: "text.primary", overflow: "hidden", overflowY: 'hidden', overflowX: 'hidden', }}>
                {gameState.current.isGameOver &&
                    <Box sx={{ backgroundColor: theme.palette.error.main, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", height: "100%", width: "100%", position: "absolute", top: 0, left: 0, zIndex: 10 }}>
                        <Typography variant="h4" align="center" gutterBottom>Game Over</Typography>
                        <Typography variant="h6">{gameState.current.score.left > gameState.current.score.right ? "Left Player Wins!" : "Right Player Wins!"}</Typography>
                    </Box>
                }
                {/* Left paddle */}
                <Box sx={{ position: "absolute", left: 10, top: gameState.current.paddles.left, width: "10px", height: PADDLE_HEIGHT, bgcolor: "primary.main" }} />
                {/* Right paddle */}
                <Box sx={{ position: "absolute", left: 580, top: gameState.current.paddles.right, width: "10px", height: PADDLE_HEIGHT, bgcolor: "secondary.main" }} />
                {/* Ball */}
                <Box sx={{ position: "absolute", top: gameState.current.ball.y, left: gameState.current.ball.x, width: "20px", height: "20px", borderRadius: "50%", bgcolor: "error.main" }} />
            </Box>
            {/* Instructions */}
            <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
                Controls: Left Player (W / S) — Right Player (↑ / ↓)
            </Typography>
        </Box>
    );
};
export default PingPongGame;