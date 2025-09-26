//Button.js
import React from "react";
import { Box, useTheme, Button } from "@mui/material";

const CustomButton = ({ onUp, onDown, onLeft, onRight }: { onUp: () => void, onDown: () => void, onLeft: () => void, onRight: () => void }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.greenCustomColors[0]
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button onClick={onUp} variant="contained" sx={{ width: "60px", padding: "20px", border: "0px solid", borderRadius: "20px", fontWeight: 'bold', color: '#000', background: backgroundColor + " !important", }}>UP</Button>
                <Button onClick={onLeft} variant="contained" sx={{ width: "60px", padding: "20px", border: "0px solid", borderRadius: "20px", fontWeight: 'bold', color: '#000', background: backgroundColor + " !important", }}>LEFT</Button>
                <Button onClick={onRight} variant="contained" sx={{ width: "60px", padding: "20px", border: "0px solid", borderRadius: "20px", fontWeight: 'bold', color: '#000', background: backgroundColor + " !important", }}>RIGHT</Button>
                <Button onClick={onDown} variant="contained" sx={{ width: "60px", padding: "20px", border: "0px solid", borderRadius: "20px", fontWeight: 'bold', color: '#000', background: backgroundColor + " !important", }}>DOWN</Button>
            </Box>
        </Box>
    );
};
export default CustomButton;