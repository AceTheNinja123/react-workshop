/**
 * RandomQuoteGenerator component that fetches and displays random advice.
 * 
 * This component fetches random advice from the Advice Slip API and displays it
 * with a styled typography component. Users can click a button to fetch new advice.
 * 
 * @component
 * @returns {JSX.Element} A centered box containing the advice text and a button to fetch new advice
 * 
 * @example
 * return <RandomQuoteGenerator />
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, } from "@mui/material";
/* Taken inspiration from this: https://www.geeksforgeeks.org/reactjs/random-quote-generator-app-using-reactjs/ */
const RandomQuoteGenerator = () => {
    const [advice, setAdvice] = useState<string>("");

    const fetchAdvice = () => {
        axios
            .get("https://api.adviceslip.com/advice")
            .then((response) => {
                const { advice } = response.data.slip;
                setAdvice(advice);
            })
            .catch((error) => { console.log(error); });
    };

    useEffect(() => {
        if (advice === "") fetchAdvice();
    }, [advice]);

    return (
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
                    {advice}
                </Typography>
            </Box>

            <Button variant="contained" color="success" className="button" onClick={fetchAdvice} sx={{ border: "none", padding: "15px 30px", fontSize: "18px", borderRadius: "25px", cursor: "pointer", transition: "background-color 0.3s ease", textTransform: "uppercase", letterSpacing: "1px", }}>
                Give Me Advice
            </Button>
        </Box>
    );
};

export default RandomQuoteGenerator;