import RandomQuoteGeneratorFunction from "@/app/_componets/dashboardComponets/randomQuoteGenerator/RandomQuoteGenerator";
import React from "react";
import { Box } from "@mui/material";
const RandomQuoteGenerator = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <RandomQuoteGeneratorFunction/>
        </Box>
    );
}
export default RandomQuoteGenerator; 