import React from "react";
import { Box } from "@mui/material";
import SimpleImageEditorFunction from "@/app/_componets/dashboardComponets/simpleImageEditor/SimpleImageEditor";
const SimpleImageEditor = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <SimpleImageEditorFunction/>
        </Box >
    );
};

export default SimpleImageEditor;