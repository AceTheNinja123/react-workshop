/**
 * Icon component for the "Tap the Icon" game.
 * Displays an animated icon that the user must click to increase their score.
 * Renders a countdown timer, the current score, and a game over overlay when time expires.
 *
 * @component
 * @example
 * ```tsx
 * <Icon
 *   animationDuration="2s"
 *   score={10}
 *   timeLeft={30}
 *   moveAnimation={moveKeyframes}
 *   handleCount={() => setScore(score + 1)}
 *   restart={() => resetGame()}
 *   gameOver={false}
 * />
 * ```
 *
 * @param {IconProps} props - The component props
 * @param {string | null} props.animationDuration - Duration of the icon animation (e.g., "2s"). Null disables animation.
 * @param {number} props.score - Current score in the game
 * @param {number} props.timeLeft - Remaining time in seconds
 * @param {Keyframes} props.moveAnimation - Emotion keyframes animation for icon movement
 * @param {() => void} props.handleCount - Callback function invoked when the icon is clicked
 * @param {() => void} props.restart - Callback function to restart the game
 * @param {boolean} props.gameOver - Flag indicating if the game has ended
 *
 * @returns {JSX.Element} The rendered Icon component with game UI and controls
 */
import React from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { type Keyframes } from "@emotion/react";
interface IconProps { animationDuration: string | null; score: number; timeLeft: number; moveAnimation: Keyframes; handleCount: () => void; restart: () => void; gameOver: boolean; }
const Icon = ({ animationDuration, score, timeLeft, moveAnimation, handleCount, restart, gameOver, }: IconProps) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.primary.main;

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, position: "relative", }}>
            <Typography variant="h6">Time Left: {timeLeft}s</Typography>
            <Box sx={{ width: 600, height: 500, position: "relative", border: `2px solid ${backgroundColor}`, borderRadius: 0, overflow: "hidden", cursor: !gameOver && animationDuration ? "pointer" : "default", }}>
                {!gameOver && (
                    <Box
                        component="img"
                        src="https://thumbs.dreamstime.com/b/funny-animal-portrait-weird-hairstyle-humorous-face-expression-400741677.jpg"
                        alt="Tap the Icon"
                        onClick={!gameOver ? handleCount : undefined}
                        sx={{ width: 80, height: 80, borderRadius: "50%", position: "absolute", animation: animationDuration ? `${moveAnimation} ${animationDuration} linear infinite alternate` : "none", }}
                    />
                )}

                {/* Game Over overlay */}
                {gameOver && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: backgroundColor,
                            color: "white",
                            zIndex: 2,
                        }}
                    >
                        <Typography variant="h4">Game Over</Typography>
                        <Typography variant="h5" sx={{ mt: 1 }}>Final Score: {score}</Typography>
                        <Button onClick={restart} variant="contained" color="error" sx={{ mt: 2 }}>Restart</Button>
                    </Box>
                )}
            </Box>

            {!gameOver && (<Typography variant="h5" sx={{ mt: 2 }}>Score: {score}</Typography>)}
        </Box>
    );
};

export default Icon;
