import QuizGameFunction from "@/app/_componets/gamesComponets/quizGame/QuizGame";
import React from "react";
import { Box } from "@mui/material";
const QuizGame = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <QuizGameFunction />
        </Box>
    );
}
export default QuizGame; 