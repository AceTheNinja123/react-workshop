import React, { useState } from "react";
import { Box } from "@mui/material";
import ColourPaletteGeneratorFunction from "@/app/_componets/colorPaletteGenerator/ColourPaletteGenerator";
const ColourPaletteGenerator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <ColourPaletteGeneratorFunction/>
        </Box >
    );
};

export default ColourPaletteGenerator;