/**
 * Dictionary component that allows users to search for word definitions and meanings.
 * 
 * This component fetches word data from the Free Dictionary API and displays:
 * - Word pronunciation with audio playback
 * - Part of speech
 * - Definition
 * - Usage examples
 * 
 * @component
 * @example
 * return (
 *   <Dictionary />
 * )
 * 
 * @returns {JSX.Element} A dictionary search interface with search bar and word details
 * 
 * @remarks
 * - Uses the Free Dictionary API (https://www.dictionaryapi.dev/)
 * - Inspired by GeeksforGeeks tutorial on creating dictionary apps
 * - Requires internet connection to fetch word data
 * 
 * @dependencies
 * - React 18+ (useState hook)
 * - Axios for HTTP requests
 * - Material-UI (Box, Typography, Button, TextField, IconButton)
 * - Tabler Icons React (IconSearch, IconVolume)
 */
"use client";
import React, { useState } from "react";
import Axios from "axios";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { IconSearch, IconVolume } from "@tabler/icons-react";
/* Taken inspiration from this: https://www.geeksforgeeks.org/reactjs/how-to-create-a-dictionary-app-in-reactjs/ */
interface DictionaryResult {
    "word": string;
    "phonetic": string;
    "phonetics": [{ "text": string; "audio": string; "sourceUrl": string; "license": { "name": string; "url": string; } },],
    "meanings": [{ "partOfSpeech": string; "definitions": [{ "definition": string; "synonyms": string[]; "antonyms": string[]; "example": string; },], "synonyms": string[]; "antonyms": string[]; },],
    "license": { "name": string; "url": string; },
    "sourceUrls": string[]
}

const Dictionary = () => {
    // Setting up the initial states using react hook 'useState"
    const [data, setData] = useState<DictionaryResult>();
    const [searchWord, setSearchWord] = useState("");

    // Function to fetch information on button  click, and set the data accordingly
    function getMeaning() {
        Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`).then((response) => { setData(response.data[0]); });
    }

    // Function to play and listen the phonetics of the searched word
    const playAudio = () => {
        if (data?.phonetics?.[0]?.audio) {
            const audio = new Audio(data?.phonetics[0].audio);
            audio.play();
        }
    };
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ display: "flex", border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden", width: "400px", }}            >
                <TextField
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchWord(e.target.value)}
                    sx={{ flex: 1, "& fieldset": { border: "none" }, }}
                />
                <Button
                    variant="contained"
                    sx={{ borderRadius: 0, }}
                    onClick={() => getMeaning()}
                >
                    <IconSearch size={20} />
                </Button>
            </Box>
            {data && (
                <Box sx={{ width: "400px", padding: "20px" }}>
                    {/* Word + Audio Button */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h4" fontWeight="bold">{data.word}</Typography>
                        <IconButton onClick={playAudio} color="primary"><IconVolume size={26} /></IconButton>
                    </Box>

                    {/* Part of Speech */}
                    <Typography variant="h6" mt={2}>Part of Speech:</Typography>
                    <Typography>{data.meanings[0]?.partOfSpeech}</Typography>

                    {/* Definition */}
                    <Typography variant="h6" mt={2}>Definition:</Typography>
                    <Typography>{data.meanings[0]?.definitions[0]?.definition}</Typography>

                    {/* Example */}
                    {data.meanings[0]?.definitions[0]?.example && (
                        <>
                            <Typography variant="h6" mt={2}>Example:</Typography>
                            <Typography>{data.meanings[0]?.definitions[0]?.example}</Typography>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
}
export default Dictionary;