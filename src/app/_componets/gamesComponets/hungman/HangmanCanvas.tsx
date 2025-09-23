import React from "react";
import { Box, useTheme } from "@mui/material";

const HangmanCanvas = ({ mistakes }: { mistakes: number }) => {
    const theme = useTheme();
    const Mode = theme.palette.mode
    const color = Mode == "light" ? "black" : "white";
    return (
        <Box
            sx={{
                position: "relative",
                width: 150,
                height: 200,
                margin: "20px auto",
                borderLeft: "5px solid " + color,
                borderTop: "5px solid " + color,
                borderRight: "none",
                borderBottom: "none",
            }}
        >
            {/* Head */}
            {mistakes > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        border: "4px solid " + color,
                    }}
                />
            )}

            {/* Body */}
            {mistakes > 1 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 90,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 4,
                        height: 70,
                        backgroundColor: color,
                    }}
                />
            )}

            {/* Left Arm */}
            {mistakes > 2 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 110,
                        left: "50%",
                        width: 40,
                        height: 4,
                        backgroundColor: color,
                        transform: "translateX(-100%) rotate(-30deg)",
                        transformOrigin: "right center",
                    }}
                />
            )}

            {/* Right Arm */}
            {mistakes > 3 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 110,
                        left: "50%",
                        width: 40,
                        height: 4,
                        backgroundColor: color,
                        transform: "rotate(30deg)",
                        transformOrigin: "left center",
                    }}
                />
            )}

            {/* Left Leg */}
            {mistakes > 4 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 160,
                        left: "50%",
                        width: 40,
                        height: 4,
                        backgroundColor: color,
                        transform: "translateX(-100%) rotate(-30deg)",
                        transformOrigin: "right center",
                    }}
                />
            )}

            {/* Right Leg */}
            {mistakes > 5 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 160,
                        left: "50%",
                        width: 40,
                        height: 4,
                        backgroundColor: color,
                        transform: "rotate(30deg)",
                        transformOrigin: "left center",
                    }}
                />
            )}
        </Box>
    );
};

export default HangmanCanvas;
