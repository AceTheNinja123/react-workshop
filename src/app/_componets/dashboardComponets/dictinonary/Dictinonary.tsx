"use client";
import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { Box, Typography, Button, TextField, InputAdornment, Grid, useTheme, IconButton } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
const Dictinonary = () => {
    // Setting up the initial states using react hook 'useState'
    const [data, setData] = useState("");
    const [searchWord, setSearchWord] = useState("");

    // Function to fetch information on button 
    // click, and set the data accordingly
    function getMeaning() {
        Axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
        ).then((response) => {
            setData(response.data[0]);
        });
    }

    // Function to play and listen the 
    // phonetics of the searched word
    // function playAudio() {
    //     let audio = new Audio(data.phonetics?.[0].audio);
    //     audio.play();
    // }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
            <Box sx={{
                backgroundColor: "#4DB33D",
                height: "38px",
                width: "60px",
                border: "none",
                color: "white",
                boxShadow: "px 3px 2px #439e34 0",
                cursor: "pointer",
                padding: "0",
            }}>
                <TextField
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchWord(e.target.value);
                    }}
                />
                <Button variant="contained" color="success"><IconSearch size={20} /></Button>
            </Box>
        </Box>
    );
}
export default Dictinonary;