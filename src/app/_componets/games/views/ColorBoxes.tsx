import ColorBoxesFunction from "@/app/_componets/colorBoxes/colorboxes";
import React from "react";
import { Box, useTheme } from "@mui/material";
const ColorBoxes = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <ColorBoxesFunction colors={theme.palette.customColors} />
        </Box>
    );
}
export default ColorBoxes; 