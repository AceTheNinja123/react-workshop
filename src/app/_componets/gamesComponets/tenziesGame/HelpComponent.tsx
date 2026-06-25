// HelpComponent.js
import React from 'react';
import { Box, Typography, List, ListItem, Button } from "@mui/material";

const HelpComponent = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
	return (
		show && (
			<Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999, transition: "opacity 0.3s ease-in-out", }}>
				<Box sx={{
					background: "#fff",
					color: "#333",
					borderRadius: "5px",
					padding: "20px",
					maxWidth: "80%",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
					textAlign: "left",
				}}>
					<Typography variant="h4" gutterBottom sx={{ fontSize: "24px", marginBottom: "10px" }}>
						Instructions
					</Typography>
					<List sx={{ p: 0, listStyleType: "none", fontSize: "18px", marginBottom: "20px" }}>
						<ListItem sx={{ marginBottom: "10px" }}>Step 1: Click on a dice to freeze or unfreeze it.</ListItem>
						<ListItem sx={{ marginBottom: "10px" }}>Step 2: Click `Start Game` to begin.</ListItem>
						<ListItem sx={{ marginBottom: "10px" }}>Step 3: Roll the dice to match a winning combination.</ListItem>
						<ListItem sx={{ marginBottom: "10px" }}>Step 4: The timer will start when the game begins.</ListItem>
						<ListItem sx={{ marginBottom: "10px" }}>Step 5: Win the game by matching all dice to the same number.</ListItem>
					</List>
					<Button variant="contained" color="error" onClick={handleClose} sx={{ border: "none", borderRadius: 3, padding: "8px 16px", cursor: "pointer", transition: "background-color 0.2s" }}>
						Close
					</Button>
				</Box>
			</Box >
		)
	);
};
export default HelpComponent;