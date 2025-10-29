import React from "react";
import { Box } from "@mui/material";
import JokeGeneratorFunction from "@/app/_componets/dashboardComponets/jokeGenerator/JokeGenerator";
const JokeGenerator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <JokeGeneratorFunction/>
        </Box >
    );
};

export default JokeGenerator;