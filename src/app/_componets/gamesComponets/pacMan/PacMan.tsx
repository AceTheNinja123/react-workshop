/**
 * PacManGame component - A React-based Pac-Man game.
 *
 * This component implements a simplified version of the classic Pac-Man game.
 * Players control Pac-Man to eat coins while avoiding ghosts.
 *
 * @component
 * @returns {JSX.Element} A Box containing the game board, controls, and game status.
 *
 * @example
 * // Usage in a parent component:
 * <PacManGame />
 *
 * @remarks
 * - Uses `useState` and `useEffect` hooks for game state management (Pac-Man position, ghost positions, map, game status).
 * - `useCallback` is used to memoize event handlers and functions to prevent unnecessary re-renders.
 * - The game board is represented by a 2D array, where:
 *   - `1` represents a wall.
 *   - `2` represents a coin.
 *   - `3` represents an empty space (after a coin is eaten).
 * - Pac-Man's movement is controlled by arrow keys or Numpad (8, 4, 5, 6).
 * - Ghosts move autonomously, attempting to chase Pac-Man.
 * - The game ends if Pac-Man collides with a ghost or eats all coins.
 * - Provides "Start Game" and "Restart Game" functionality.
 * - Visuals are handled using background images for walls, coins, Pac-Man, and ghosts.
 *
 * Inspiration from: https://www.geeksforgeeks.org/reactjs/pacman-game-using-reactjs/
 */


import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
const wall = "/images/pacMan/wall.png";
const coin = "/images/pacMan/coin.png";
const pacmann = "/images/pacMan/pacman.png";
const bg = "/images/pacMan/bg.png";
const ghost = "/images/pacMan/ghost2.png";

const initialPacmanPos = { x: 6, y: 4 };
const initialGhostsPos = [{ x: 7, y: 7 }];

const getInitialBoard = () => [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 3, 1, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const PacManGame = () => {
    // State for PacMan position and game map
    const [pacman, setPacman] = useState(initialPacmanPos);
    const [ghosts, setGhosts] = useState(initialGhostsPos);
    const [map, setMap] = useState(getInitialBoard);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Function to check for winning condition
    const checkWin = useCallback((currentMap: number[][]) => {
        if (!currentMap.some((row) => row.includes(2))) {
            setGameOver(true);
            setWin(true);
        }
    }, [setGameOver, setWin]);
    // Function to handle PacMan movement
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (gameOver || !gameStarted) return;

        let newX = pacman.x;
        let newY = pacman.y;

        // Directional movement
        if ((event.key === "4" || event.key === "ArrowLeft") && pacman.x > 0 && map[pacman.y][pacman.x - 1] !== 1) { newX -= 1; } // Left
        else if ((event.key === "8" || event.key === "ArrowUp") && pacman.y > 0 && map[pacman.y - 1][pacman.x] !== 1) { newY -= 1; } // Up
        else if ((event.key === "6" || event.key === "ArrowRight") && pacman.x < map[0].length - 1 && map[pacman.y][pacman.x + 1] !== 1) { newX += 1; } // Right
        else if ((event.key === "5" || event.key === "ArrowDown") && pacman.y < map.length - 1 && map[pacman.y + 1][pacman.x] !== 1) { newY += 1; } // Down
        else { return; }// Invalid move

        // Check for collision with a ghost
        if (ghosts.some(g => g.x === newX && g.y === newY)) {
            setGameOver(true);
            return;
        }

        // Check for coin
        if (map[newY][newX] === 2) {
            const newMap = map.map(row => [...row]);
            newMap[newY][newX] = 3; // Eat coin
            setMap(newMap);
            checkWin(newMap);
        }

        // Update state and check for winning condition
        setPacman({ x: newX, y: newY });
    }, [pacman, map, gameOver, checkWin, gameStarted, ghosts]);

    const moveGhosts = useCallback(() => {
        let collision = false;

        const updatedGhosts = ghosts.map(g => {
            if (collision) return g;

            const { x, y } = g;
            const validMoves = [];

            // Check possible moves (not a wall)
            if (y > 0 && map[y - 1][x] !== 1) validMoves.push({ x: x, y: y - 1 }); // Up
            if (y < map.length - 1 && map[y + 1][x] !== 1) validMoves.push({ x: x, y: y + 1 }); // Down
            if (x > 0 && map[y][x - 1] !== 1) validMoves.push({ x: x - 1, y: y }); // Left
            if (x < map[0].length - 1 && map[y][x + 1] !== 1) validMoves.push({ x: x + 1, y: y }); // Right

            if (validMoves.length > 0) {
                // Sort moves by distance to PacMan (Manhattan distance)
                validMoves.sort((a, b) => {
                    const distA = Math.abs(a.x - pacman.x) + Math.abs(a.y - pacman.y);
                    const distB = Math.abs(b.x - pacman.x) + Math.abs(b.y - pacman.y);
                    return distA - distB;
                });

                const move = validMoves[0];

                if (move.x === pacman.x && move.y === pacman.y) {
                    collision = true;
                    return g;
                }
                return move;
            }
            return g;
        });

        if (collision) { setGameOver(true); }
        else { setGhosts(updatedGhosts); }
    }, [map, pacman, ghosts]);

    const savedMoveGhosts = useRef(moveGhosts);

    useEffect(() => { savedMoveGhosts.current = moveGhosts; }, [moveGhosts]);

    // Initial rendering
    useEffect(() => {
        const handleKeyDownEvent = (event: KeyboardEvent) => handleKeyDown(event);
        document.addEventListener("keydown", handleKeyDownEvent);
        return () => { document.removeEventListener("keydown", handleKeyDownEvent); };
    }, [handleKeyDown]);

    useEffect(() => {
        if (gameOver || !gameStarted) return;
        const gameLoop = setInterval(() => savedMoveGhosts.current(), 800); // Ghosts move every 800ms
        return () => clearInterval(gameLoop);
    }, [gameOver, gameStarted]);

    const handleRestart = () => {
        setMap(getInitialBoard());
        setPacman(initialPacmanPos);
        setGhosts(initialGhostsPos);
        setGameOver(false);
        setWin(false);
        setGameStarted(true);
    };

    return (
        <Box id="world" sx={{ position: "relative", p: 2, backgroundColor: "primary.light", lineHeight: "0px", textAlign: "center", display: "inline-block" }}>
            <Typography variant="h1" color="primary" sx={{ fontFamily: `'Lobster', cursive`, fontSize: '50px', padding: '20px' }}>PacMan Game</Typography>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>Use Arrow Keys or Numpad (8, 4, 5, 6) to Move</Typography>
            {(gameOver || !gameStarted) && (
                <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.75)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", zIndex: 10, color: "white", }}>
                    {gameOver && (<Typography variant="h2" sx={{ fontFamily: `'Lobster', cursive`, mb: 2 }}>{win ? "You Win!" : "Game Over"}</Typography>)}
                    <Button variant="contained" color="secondary" onClick={handleRestart} sx={{ fontSize: "1.5rem", padding: "10px 30px" }}>{gameOver ? "Restart Game" : "Start Game"}</Button>
                </Box>
            )}
            {/* Render the game map */}
            {map.map((row, rowIndex) => (
                <Box key={rowIndex} sx={{ display: "flex" }}>
                    {row.map((cell, colIndex) => {
                        let displayCell = cell;
                        if (pacman.x === colIndex && pacman.y === rowIndex) displayCell = 5;
                        if (ghosts.some(g => g.x === colIndex && g.y === rowIndex)) displayCell = 4;
                        return (
                            <Box
                                key={colIndex}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    display: "inline-block",
                                    backgroundColor: displayCell === 1 ? '#5e318c' : 'transparent',
                                    backgroundImage: displayCell === 1 ? `url(${wall})` : displayCell === 2 ? `url(${coin})` : displayCell === 3 ? `url(${bg})` : displayCell === 4 ? `url(${ghost})` : displayCell === 5 ? `url(${pacmann})` : undefined
                                }}>
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
};

export default PacManGame;