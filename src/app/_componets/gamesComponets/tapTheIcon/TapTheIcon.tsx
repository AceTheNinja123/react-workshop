import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import Icon from "./Icon";
import Menu from "./Menu";

/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/tap-the-geek-simple-html-css-and-javascript-game/ */

const TapTheIcon = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [animationDuration, setAnimationDuration] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Randomized keyframe movement
    const moveAnimation = keyframes`
        0% { left: ${Math.random() * 80}%; top: ${Math.random() * 30}% }
        10% { left: ${Math.random() * 80}%; top: ${Math.random() * 10}% }
        20% { left: ${Math.random() * 40}%; top: ${Math.random() * 50}% }
        30% { left: ${Math.random() * 80}%; top: ${Math.random() * 10}% }
        40% { left: ${Math.random() * 30}%; top: ${Math.random() * 20}% }
        50% { left: ${Math.random() * 80}%; top: ${Math.random() * 40}% }
        60% { left: ${Math.random() * 70}%; top: ${Math.random() * 80}% }
        70% { left: ${Math.random() * 50}%; top: ${Math.random() * 80}% }
        80% { left: ${Math.random() * 90}%; top: ${Math.random() * 90}% }
        90% { left: ${Math.random() * 80}%; top: ${Math.random() * 70}% }
        100% { left: ${Math.random() * 90}%; top: ${Math.random() * 60}% }
    `;

    // Timer constants
    const TICK_MS = 1000;
    const DECREMENT = 1;

    function startTimer(tickMs = TICK_MS, decrement = DECREMENT) {
        if (timerRef.current) { clearInterval(timerRef.current); }

        timerRef.current = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= decrement) {
                    clearInterval(timerRef.current!);
                    setGameOver(true);
                    setAnimationDuration(null); // stop movement
                    return 0;
                }
                return prev - decrement;
            });
        }, tickMs);
    }

    const handleMode = (speed: string) => {
        setAnimationDuration(speed);
        setGameOver(false);
        setTimeLeft(30);
        setScore(0);
        startTimer();
    };

    const handleCount = () => { if (!gameOver) setScore((prev) => prev + 1); };

    const restart = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(30);
        setAnimationDuration(null);
        setScore(0);
        setGameOver(false);
    };

    return (
        <Box
            sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", }}>
            {animationDuration || gameOver ? (
                <Icon
                    animationDuration={animationDuration}
                    score={score}
                    timeLeft={timeLeft}
                    moveAnimation={moveAnimation}
                    handleCount={handleCount}
                    restart={restart}
                    gameOver={gameOver}
                />
            ) : (
                <Menu handleMode={handleMode} />
            )}
        </Box>
    );
};

export default TapTheIcon;