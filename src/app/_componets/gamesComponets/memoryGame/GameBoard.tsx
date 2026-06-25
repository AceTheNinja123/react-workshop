
/**
 * GameBoard component for a Memory Game.
 * 
 * Manages the game state and logic for a memory/matching card game where players
 * flip cards to find matching pairs. The component tracks which cards have been
 * selected, counts moves, and determines when the game is won.
 * 
 * @component
 * @returns {React.ReactElement} A centered game board with cards in a grid layout,
 * move counter, win message, and new game button.
 * 
 * @example
 * return <GameBoard />
 * 
 * @remarks
 * - Initializes a random shuffled deck of cards on component mount
 * - Prevents card flipping during comparison animations
 * - Game is won when all 6 pairs are matched
 * - Inspiration: https://www.geeksforgeeks.org/reactjs/memory-game-from-scratch-using-react/
 */
// GameBoard.tsx
import React from "react";
import Data, { dataType } from "./data";
import Card from "./Card";
import { Box, Typography, Button, Grid, Paper, useTheme } from "@mui/material";
/* Taken inspiration from https://www.geeksforgeeks.org/reactjs/memory-game-from-scratch-using-react/ */
function GameBoard() {
    const [cardsArray, setCardsArray] = React.useState<Array<dataType>>([]);
    const [moves, setMoves] = React.useState(0);
    const [firstCard, setFirstCard] = React.useState<dataType | null>(null);
    const [secondCard, setSecondCard] = React.useState<dataType | null>(null);
    const [stopFlip, setStopFlip] = React.useState(false);
    const [won, setWon] = React.useState(0);
    const theme = useTheme();
    // start new Game
    function NewGame() {
        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1000);
    }

    function handleSelectedCards(item: dataType) {
        if (firstCard !== null && firstCard.id !== item.id) { setSecondCard(item); }
        else { setFirstCard(item); }
    }

    React.useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => prevArray.map((unit) => unit.name === firstCard.name ? { ...unit, matched: true } : unit));
                setWon((preVal) => preVal + 1);
                removeSelection();
            }
            else { setTimeout(() => { removeSelection(); }, 1000); }
        }
    }, [firstCard, secondCard]);

    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevValue) => prevValue + 1);
    }

    React.useEffect(() => { NewGame(); }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ bgcolor: theme.palette.primary.light, p: 2, height: '750px', width: "100%", alignContent: 'center', justifyContent: 'center' }}    >
            {/* Header */}
            <Box mb={2}><Typography variant="h3" align="center" color="primary">Memory Game</Typography></Box>

            {/* Board */}
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ maxWidth: 600 }}
            >
                {cardsArray.map((item) => (
                    <Grid size={{ xs: 3 }} key={item.id}>
                        <Card
                            item={item}
                            handleSelectedCards={handleSelectedCards}
                            toggled={item === firstCard || item === secondCard || item.matched === true}
                            stopflip={stopFlip}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Status */}
            <Paper elevation={3} sx={{ mt: 5, py: 1, px: 3, borderRadius: "2rem", textAlign: "center", }}>
                {won !== 6 ? (<Typography variant="h6">Moves: {moves}</Typography>) :
                    (<Typography variant="h6" color="success.main"> 🎉 You Won in {moves} moves! 🎉 </Typography>)}
            </Paper>

            {/* Button */}
            <Button
                variant="contained"
                // color="error"
                onClick={NewGame}
                sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    width: 200,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderRadius: "0.7rem",
                    fontFamily: "cursive",
                    backgroundColor: `${theme.palette.error.main} !important`,
                    color: "white",
                    "&:hover": { backgroundColor: `${theme.palette.error.dark} !important`, },
                }}
            >
                New Game
            </Button>
        </Box>
    );
}

export default GameBoard;