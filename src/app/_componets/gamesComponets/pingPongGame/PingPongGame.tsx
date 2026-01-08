
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
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, useTheme } from "@mui/material";
/* Taken inspiration from this:https://www.geeksforgeeks.org/reactjs/ping-pong-game-using-react/ */

const PingPongGame = () => {
    const initialBallState = { x: 300, y: 200, speedX: 5, speedY: 5 };
    const initialPaddleState = { left: 150, right: 150 };
    const [ball, setBall] = useState(initialBallState);
    const [paddles, setPaddles] = useState(initialPaddleState);
    const [gameOver, setGameOver] = useState(false);
    const [gameRunning, setGameRunning] = useState(false);
    const ballRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const GAME_HEIGHT = 400;
    const PADDLE_HEIGHT = 60;
    useEffect(() => {
        if (gameRunning) {

            const handleKeyPress = (e: KeyboardEvent) => {
                switch (e.key) {
                    // Right paddle (arrows)
                    case "8":
                        setPaddles((prev) => ({ ...prev, right: Math.max(prev.right - 10, 0) }));
                        break;
                    case "2": // right paddle down
                        setPaddles((prev) => ({ ...prev, right: Math.min(prev.right + 10, GAME_HEIGHT - PADDLE_HEIGHT), }));
                        break;

                    // Left paddle (W/S)
                    case "w":
                    case "W":
                        setPaddles((prev) => ({ ...prev, left: Math.max(prev.left - 10, 0) }));
                        break;
                    case "s":
                    case "S": // left paddle down
                        setPaddles((prev) => ({ ...prev, left: Math.min(prev.left + 10, GAME_HEIGHT - PADDLE_HEIGHT), }));
                        break;

                    default:
                        break;
                }
            };

            const updateGame = () => {
                if (gameOver) return;

                setBall((prevBall) => {
                    let newX = prevBall.x + prevBall.speedX;
                    const newY = prevBall.y + prevBall.speedY;
                    let newSpeedX = prevBall.speedX;
                    let newSpeedY = prevBall.speedY;

                    if (!ballRef.current) return prevBall;
                    const ballRect = ballRef.current.getBoundingClientRect();
                    const paddleLeft = document.getElementById('paddle-left')?.getBoundingClientRect();
                    const paddleRight = document.getElementById('paddle-right')?.getBoundingClientRect();

                    // ✅ Collision with left paddle
                    if (paddleLeft &&
                        ballRect.left <= paddleLeft.right &&
                        ballRect.right >= paddleLeft.left &&
                        ballRect.top <= paddleLeft.bottom &&
                        ballRect.bottom >= paddleLeft.top
                    ) {
                        newX = paddleLeft.right - ballRect.left + prevBall.x; // push ball outside paddle
                        newSpeedX = -Math.abs(newSpeedX); // ensure it bounces right
                        newSpeedY += (Math.random() - 0.5) * 2;
                    }

                    // ✅ Collision with right paddle
                    if (paddleRight &&
                        ballRect.left <= paddleRight.right &&
                        ballRect.right >= paddleRight.left &&
                        ballRect.top <= paddleRight.bottom &&
                        ballRect.bottom >= paddleRight.top
                    ) {
                        newX = prevBall.x - (ballRect.right - paddleRight.left); // push ball outside paddle
                        newSpeedX = Math.abs(newSpeedX) * -1; // ensure it bounces left
                        newSpeedY += (Math.random() - 0.5) * 2;
                    }

                    // ✅ Bounce off top and bottom
                    if (newY <= 0 || newY >= 380) {
                        newSpeedY = -newSpeedY;
                    }

                    // ✅ Check for game over
                    if (newX < 0 || newX > 600) {
                        setGameOver(true);
                        pauseGame();
                    }

                    return { ...prevBall, x: newX, y: newY, speedX: newSpeedX, speedY: newSpeedY };
                });
            };

            const intervalId = setInterval(updateGame, 50);

            window.addEventListener('keydown', handleKeyPress);

            return () => {
                clearInterval(intervalId);
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [gameRunning, ball, paddles.left, paddles.right, gameOver]);

    const startGame = () => { setGameRunning(true); };

    const restartGame = () => {
        setBall(initialBallState);
        setPaddles(initialPaddleState);
        setGameOver(false);
        setGameRunning(false);
    };

    const pauseGame = () => { setGameRunning(false); };

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* Button controls */}
            <Box sx={{ margin: "10px", display: "flex", gap: "10px" }}>
                <Button variant="contained" color="primary" onClick={startGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Start</Button>
                <Button variant="contained" color="primary" onClick={pauseGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Pause</Button>
                <Button variant="contained" color="primary" onClick={restartGame} sx={{ padding: "5px 10px", fontSize: "16px" }}>Restart</Button>
            </Box>
            {/* Game area */}
            <Box sx={{ position: "relative", width: "600px", height: "400px", alignContent: "center", mx: "20px auto", border: "2px solid " + (theme.palette.mode == "light" ? "black" : "white"), overflow: "hidden", overflowY: 'hidden', overflowX: 'hidden', }}>
                {gameOver &&
                    <Box sx={{ backgroundColor: theme.palette.error.main, display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: "45vh", }}>
                        <Typography variant="h4" align="center" gutterBottom>Game Over</Typography>
                    </Box>
                }
                {/* Left paddle */}
                <Box
                    id="paddle-left"
                    sx={{ position: "absolute", left: 10, top: paddles.left, width: "10px", height: PADDLE_HEIGHT, bgcolor: "primary.main", transition: "top 0.2s", }}
                />

                {/* Right paddle */}
                <Box
                    id="paddle-right"
                    sx={{ position: "absolute", right: 10, top: paddles.right, left: '580px', width: "10px", height: PADDLE_HEIGHT, bgcolor: "secondary.main", transition: "top 0.2s", }}
                />

                {/* Ball (static for now) */}
                <Box
                    id="ball"
                    ref={ballRef}
                    sx={{ position: "absolute", top: `${ball.y}px`, left: `${ball.x}px`, width: "20px", height: "20px", borderRadius: "50%", bgcolor: "error.main", }}
                />
            </Box>
        </Box>
    );
};
export default PingPongGame;