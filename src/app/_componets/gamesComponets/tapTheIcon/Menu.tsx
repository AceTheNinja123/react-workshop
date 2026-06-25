
/**
 * Menu component for the "Tap The Image" game.
 * Displays game title, instructions, and difficulty selection buttons.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleMode - Callback function triggered when a difficulty button is clicked
 * @param {string} props.handleMode.duration - The selected game duration ("20s", "15s", or "10s")
 * @returns {React.ReactElement} A styled Box containing the menu UI with title, description, and difficulty buttons
 * 
 * @example
 * const handleDifficultySelect = (duration: string) => {
 *   console.log(`Starting game with duration: ${duration}`);
 * };
 * return <Menu handleMode={handleDifficultySelect} />;
 */
import React from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";

const Menu = ({ handleMode }: { handleMode: (duration: string) => void }) => {
    const theme = useTheme();
    const backgroundColor = theme.palette.primary.main;

    return (
        <Box
            sx={{ width: "600px", height: "500px", padding: 5, backgroundColor, borderRadius: 0, color: "white", display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h2">Tap The Image</Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>Click on a difficulty to start the game</Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Button variant="contained" color="info" onClick={() => handleMode("20s")}>EASY</Button>
                <Button variant="contained" color="warning" onClick={() => handleMode("15s")}>MEDIUM</Button>
                <Button variant="contained" color="error" onClick={() => handleMode("10s")}>HARD</Button>
            </Box>
        </Box>
    );
};

export default Menu;