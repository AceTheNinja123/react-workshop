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