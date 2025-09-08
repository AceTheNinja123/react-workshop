import ColorBoxesFunction from "@/app/_componets/colorBoxes/colorboxes";
import React from "react";
import { Box, useTheme } from "@mui/material";
const ColorBoxes = () => {
    const theme = useTheme();
    return (
        <Box sx={{width: '100%', display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <ColorBoxesFunction colors={theme.palette.customColors} />
        </Box>
    );
}
export default ColorBoxes; 