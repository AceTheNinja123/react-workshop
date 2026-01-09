import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { Grid } from "@mui/system";
/**
 * SimonGame Component
 *
 * Implements the classic Simon game where players must repeat a sequence of colors and sounds.
 * The game progresses through levels, adding a new color to the sequence each time.
 *
 * @component
 * @returns {JSX.Element} The Simon game interface with colored buttons and game status display.
 *
 * @example
 * ```tsx
 * <SimonGame />
 * ```
 *
 * @remarks
 * - Uses Material-UI components for styling.
 * - Plays audio feedback for button presses and game events (correct/wrong).
 * - Animates buttons when they are part of the sequence or clicked by the user.
 * - Tracks game level, user input, and game pattern.
 * - Handles game start, level progression, and game over conditions.
 * - Responsive design for various screen sizes.
 */

// Move styled component outside to prevent re-creation on every render
const StyledButton = styled(Button)<{ componentcolor: string; isflashing: string }>(({ theme, componentcolor, isflashing }) => ({
    margin: '15px',
    display: 'inline-block',
    height: 150,
    width: 150,
    border: '5px solid #FEF2BF',
    // borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    borderRadius: '20%',
    backgroundColor: componentcolor,
    opacity: isflashing === "true" ? 0.5 : 1,
    boxShadow: isflashing === "true" ? `0 0 20px ${componentcolor}` : 'none',
    transition: 'all 0.1s',
    '&:active': { opacity: 0.5, boxShadow: `0 0 20px ${componentcolor}` },
    '&:hover': { backgroundColor: componentcolor, opacity: 0.8 },
    [theme.breakpoints.up('md')]: { height: 200, width: 200, margin: '25px', }
}));

const buttonColours = ["red", "blue", "green", "yellow"];

const SimonGame: React.FC = () => {
    const [gamePattern, setGamePattern] = useState<string[]>([]);
    const [userClickedPattern, setUserClickedPattern] = useState<string[]>([]);
    const [level, setLevel] = useState(0);
    const [started, setStarted] = useState(false);
    const [flashingButton, setFlashingButton] = useState<string | null>(null);
    const [titleText, setTitleText] = useState("Press A Key to Start");
    const [gameOverFlash, setGameOverFlash] = useState(false);
    const [isSequencePlaying, setIsSequencePlaying] = useState(false);

    const playSound = (name: string) => {
        const audio = new Audio(`/sounds/simonGame/${name}.mp3`);
        audio.play().catch(e => console.error("Audio play failed", e));
    };

    const animatePress = (currentColor: string) => {
        setFlashingButton(currentColor);
        setTimeout(() => setFlashingButton(null), 100);
    };

    const nextSequence = useCallback(() => {
        setUserClickedPattern([]);
        setLevel(prev => prev + 1);
        setIsSequencePlaying(true);

        const randomNumber = Math.floor(Math.random() * 4);
        const randomChosenColour = buttonColours[randomNumber];

        setGamePattern(prev => {
            const newPattern = [...prev, randomChosenColour];
            newPattern.forEach((color, index) => {
                setTimeout(() => {
                    playSound(color);
                    animatePress(color);
                }, 600 * (index + 1));
            });

            setTimeout(() => {
                setIsSequencePlaying(false);
            }, 600 * newPattern.length + 100);

            return newPattern;
        });
    }, []);

    const startOver = () => {
        setLevel(0);
        setGamePattern([]);
        setStarted(false);
        setIsSequencePlaying(false);
        setTitleText("Game Over, Press Any Key to Restart");
    };

    const checkAnswer = (currentLevel: number, currentPattern: string[]) => {
        if (gamePattern[currentLevel] === currentPattern[currentLevel]) {
            if (currentPattern.length === gamePattern.length) { setTimeout(() => { nextSequence(); }, 1000); }
        } else {
            playSound("wrong");
            setGameOverFlash(true);
            setTimeout(() => setGameOverFlash(false), 200);
            startOver();
        }
    };

    const handleBtnClick = (color: string) => {
        if (!started || isSequencePlaying) return;

        const newUserPattern = [...userClickedPattern, color];
        setUserClickedPattern(newUserPattern);
        playSound(color);
        animatePress(color);
        checkAnswer(newUserPattern.length - 1, newUserPattern);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!started) {
                setStarted(true);
                nextSequence();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => { window.removeEventListener("keydown", handleKeyDown); };
    }, [started, nextSequence]);

    useEffect(() => {
        if (started) setTitleText(`Level ${level}`);
    }, [level, started]);

    return (
        <Box sx={{ textAlign: "center", backgroundColor: gameOverFlash ? "red" : "transparent", transition: "background-color 0.2s", borderRadius: "20px", p: 2 }}>
            <Typography variant="h2" sx={{ fontFamily: `'Press Start 2P', cursive`, fontSize: { xs: '1.5rem', md: '3rem' }, margin: '5%', color: '#FEF2BF', }}>
                {titleText}
            </Typography>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '600px', margin: 'auto' }}>
                <Box>
                    <StyledButton id="green" componentcolor="green" isflashing={(flashingButton === "green").toString()} onClick={() => handleBtnClick("green")} />
                    <StyledButton id="red" componentcolor="red" isflashing={(flashingButton === "red").toString()} onClick={() => handleBtnClick("red")} />
                </Box>
                <Box>
                    <StyledButton id="yellow" componentcolor="yellow" isflashing={(flashingButton === "yellow").toString()} onClick={() => handleBtnClick("yellow")} />
                    <StyledButton id="blue" componentcolor="blue" isflashing={(flashingButton === "blue").toString()} onClick={() => handleBtnClick("blue")} />
                </Box>
            </Grid>
        </Box>
    );
};
export default SimonGame;