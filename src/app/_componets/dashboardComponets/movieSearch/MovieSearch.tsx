/**
 * MovieSearch.tsx
 *
 * This component provides a movie search interface. Users can search for movies by title,
 * and the results are displayed as a collection of `MovieCard` components.
 *
 * Features:
 * - Fetches movie data from the OMDb API.
 * - Displays a search input field and a search button.
 * - Renders `MovieCard` components for each search result.
 * - Shows a "No Movies found" message if no results are returned.
 * - Uses Material-UI for styling and layout.
 * 
 * Inspired by: https://www.geeksforgeeks.org/reactjs/movie-search-engine-using-react-and-api/
 */

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { IconSearch } from '@tabler/icons-react';
const API_URL = 'https://omdbapi.com/?apikey=fe2f6c44';

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const MovieSearch = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const searchMovies = async (title: string) => {
        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
        setLoading(false);
    }
    useEffect(() => { searchMovies('Hannah Montana'); }, []);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography id="heading" variant="h4" sx={{ paddingTop: "2rem", color: "#f9d3b4", fontFamily: "var(--font-raleway)", fontWeight: 700, fontSize: "3rem", }}>
                Movie Search
            </Typography>
            <Box
                id="search-box"
                sx={{
                    width: "50%",
                    margin: "4rem 0 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.5rem 1.75rem",
                    borderRadius: "3rem",
                    background: "#1f2123",
                    WebkitBoxShadow: "5px 5px 7px #1c1d1f, -5px -5px 7px #222527",
                    boxShadow: "5px 5px 7px #1c1d1f, -5px -5px 7px #222527",
                }}
            >
                <input
                    style={{ flex: 1, border: "none", fontSize: "1.5rem", fontFamily: "var(--font-raleway)", fontWeight: 500, paddingRight: 1, outline: "none", color: "#a1a1a1", background: "#1f2123", }}
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <Button variant="contained" color="primary" onClick={() => searchMovies(searchTerm)}><IconSearch size={24} /></Button>
            </Box>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                    <CircularProgress sx={{ color: "#f9d3b4" }} />
                </Box>
            ) : movies?.length > 0 ? (
                <Box sx={{ width: "100%", marginTop: "3rem", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", }}>
                    {movies.map((movie, index) => (<MovieCard key={index} movie={movie} priority={index < 4} />))}
                </Box>
            ) : (
                <Box sx={{ width: "100%", marginTop: "3rem", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Typography variant="h6" sx={{ fontSize: "1.25rem", color: "#f9d3b4", fontFamily: "var(--font-raleway)" }}>No Movies found</Typography>
                </Box>
            )}
        </Box >
    );
}
export default MovieSearch;