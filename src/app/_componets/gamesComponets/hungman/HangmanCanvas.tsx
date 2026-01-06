
/**
 * HangmanCanvas component that renders a visual representation of a hangman figure.
 * The figure is progressively drawn based on the number of mistakes made in the game.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {number} props.mistakes - The number of mistakes made. Controls which body parts are displayed:
 *   - mistakes > 0: Head
 *   - mistakes > 1: Body
 *   - mistakes > 2: Left Arm
 *   - mistakes > 3: Right Arm
 *   - mistakes > 4: Left Leg
 *   - mistakes > 5: Right Leg
 * 
 * @returns {React.ReactElement} A box element containing the hangman drawing with conditional body parts
 * 
 * @example
 * // Display hangman with head and body (2 mistakes)
 * <HangmanCanvas mistakes={2} />
 * 
 * @remarks
 * The component uses Material-UI's Box component and useTheme hook to adapt colors
 * based on the current theme mode (light/dark).
 */
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
