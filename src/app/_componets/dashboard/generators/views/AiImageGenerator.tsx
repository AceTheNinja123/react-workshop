import React from "react";
import { Box } from "@mui/material";
import AiImageGeneratorFunction from "@/app/_componets/dashboardComponets/aiImageGenerator/AiImageGenerator";
const AiImageGenerator = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <AiImageGeneratorFunction/>
        </Box >
    );
};

export default AiImageGenerator;