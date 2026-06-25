
/**
 * SimpleTicTacToe Component
 * 
 * A React component that implements a simple Tic Tac Toe game with the following features:
 * - Two-player game where player O starts first
 * - 9-cell game board with clickable buttons
 * - Automatic winner detection based on standard Tic Tac Toe win patterns
 * - Draw detection when all cells are filled with no winner
 * - Game reset functionality
 * - Responsive design using Material-UI components
 * - Dynamic color styling for game board cells using theme customColors
 * 
 * @component
 * @example
 * return <SimpleTicTacToe />
 * 
 * @returns {JSX.Element} The rendered Tic Tac Toe game interface
 */
import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/simple-tic-tac-toe-game-using-javascript/*/
const SimpleTicTacToe: React.FC = () => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(""));
    const [turnO, setTurnO] = useState(true); // Player O starts
    const [winner, setWinner] = useState<string | null>(null);
    const theme = useTheme();
    const colorOptions = theme.palette.customColors;

    const winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],];

    const handleClick = (index: number) => {
        if (board[index] !== "" || winner) return;

        const newBoard = [...board];
        newBoard[index] = turnO ? "O" : "X";
        setBoard(newBoard);
        setTurnO(!turnO);

        checkWinner(newBoard);
    };

    const checkWinner = (currentBoard: string[]) => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                setWinner(currentBoard[a]);
                return;
            }
        }

        // Check for draw
        if (currentBoard.every((cell) => cell !== "")) { setWinner("Draw"); }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setWinner(null);
        setTurnO(true);
    };

    return (
        <Box sx={{ textAlign: "center", }}>
            {/* Winner Message */}
            {winner && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, }}>
                    <Typography variant="h3">{winner === "Draw" ? "Match Drawn" : `Congratulations, Winner is ${winner}`}</Typography>
                    <Button onClick={resetGame} sx={{ p: "1rem", fontSize: "1.25rem", borderRadius: "1rem", "&:hover": { background: "#333" }, }}>
                        New Game
                    </Button>
                </Box>
            )}

            {/* Game Board */}
            {!winner && (
                <>
                    <Typography variant="h2" gutterBottom>Tic Tac Toe</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Box sx={{ height: "60vmin", width: "60vmin", display: "flex", flexWrap: "wrap", gap: "1.5vmin", justifyContent: "center", }}>
                            {board.map((cell, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    disabled={cell !== ""}
                                    sx={{
                                        height: "18vmin",
                                        width: "18vmin",
                                        borderRadius: "1rem",
                                        fontSize: "8vmin",
                                        backgroundColor: colorOptions[Math.floor(Math.random() * colorOptions.length)],
                                        color: theme.palette.common.black + "!important",
                                        "&:hover": { backgroundColor: theme.palette.primary.dark, },
                                    }}
                                >
                                    {cell}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Button
                        id="reset"
                        onClick={resetGame}
                        variant="contained"
                        sx={{
                            mt: 3,
                            p: "1rem",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            borderRadius: "1rem",
                            "&:hover": { background: "#333" },
                        }}
                    >
                        Reset Game
                    </Button>
                </>
            )}
        </Box>
    );
};
export default SimpleTicTacToe;