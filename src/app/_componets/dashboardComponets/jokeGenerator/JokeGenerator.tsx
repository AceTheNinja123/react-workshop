/**
 * JokeGenerator Component
 * 
 * A React component that fetches and displays random jokes from the JokeAPI.
 * Users can generate new jokes and copy the current joke to their clipboard.
 * 
 * @component
 * @example
 * return (
 *   <JokeGenerator />
 * )
 * 
 * @returns {React.ReactElement} A centered layout displaying a joke with action buttons
 * 
 * @remarks
 * - Automatically fetches a joke on component mount
 * - Uses the JokeAPI (https://v2.jokeapi.dev/joke/Any?type=single) as the data source
 * - Displays error messages if the API request fails
 * - Provides visual feedback when jokes are copied to clipboard
 * 
 * @see https://www.geeksforgeeks.org/reactjs/random-quote-generator-app-using-reactjs/
 */
import React, { useState, useEffect } from "react";
import { IconRepeat, IconCopy, IconMoodXd } from "@tabler/icons-react";
import { Box, Button, Typography, } from "@mui/material";

const JokeGenerator = () => {
    const [joke, setJoke] = useState<string>("");

    const jokeFn = () => {
        fetch('https://v2.jokeapi.dev/joke/Any?type=single')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not OK');
                return response.json();
            })
            .then(data => setJoke(data.joke))
            .catch(err => {
                console.error(err);
                setJoke('Failed to fetch joke. Please try again.');
            });
    }
    const cpyFn = async () => {
        try {
            await navigator.clipboard.writeText(joke);
            alert('Joke copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy text:', error);
            alert('Failed to copy joke.');
        }
    };

    useEffect(() => { if (joke === "") jokeFn(); }, [joke]);

    return (
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h3" color='primary' sx={{ mb: 1 }}>Joke Generator <IconMoodXd size={20} /> </Typography>
            <Box sx={{ width: "50%" }}>
                <Typography variant="h1" sx={{
                    fontSize: "28px",
                    marginBottom: "30px",
                    position: "relative",
                    paddingBottom: "10px",
                    display: "inline-block",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "50px",
                        height: "3px",
                        backgroundColor: "#4caf50",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                    },
                }}>
                    {joke}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={jokeFn} startIcon={<IconRepeat size={20} />} sx={{ border: "none", padding: "15px 30px", fontSize: "18px", borderRadius: "25px", cursor: "pointer", transition: "background-color 0.3s ease", textTransform: "uppercase", letterSpacing: "1px", }}>
                    New Joke
                </Button>
                <Button variant="contained" color="primary" onClick={cpyFn} startIcon={<IconCopy size={20} />} sx={{ border: "none", padding: "15px 30px", fontSize: "18px", borderRadius: "25px", cursor: "pointer", transition: "background-color 0.3s ease", textTransform: "uppercase", letterSpacing: "1px", }}>
                    Copy Joke
                </Button>
            </Box>
        </Box>
    );
};

export default JokeGenerator;