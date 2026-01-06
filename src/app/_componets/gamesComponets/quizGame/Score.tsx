
/**
 * Score component that displays the final quiz results and provides a restart option.
 * 
 * @component
 * @example
 * const handleReset = () => {
 *   // Reset quiz logic
 * };
 * return <Score score={85} resetQuiz={handleReset} />;
 * 
 * @param {ScoreProps} props - The component props
 * @param {number} props.score - The user's final quiz score
 * @param {() => void} [props.onNextQuestion] - Optional callback for next question (unused)
 * @param {() => void} [props.resetQuiz] - Optional callback function to reset and restart the quiz
 * @returns {React.ReactElement} A centered box displaying results and restart button
 */
import React from 'react';
import { Box, Typography, Button } from "@mui/material";
interface ScoreProps { score: number, onNextQuestion?: () => void; resetQuiz?: () => void; }
const Score: React.FC<ScoreProps> = ({ score, resetQuiz }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2'>Results</Typography>
            <Typography variant='h4'>Your score: {score}</Typography>
            <Button variant="contained" color="primary" onClick={resetQuiz} sx={{ mt: 2, textTransform: "uppercase", }}>
                Restart Quiz
            </Button>
        </Box>
    );
}

export default Score;