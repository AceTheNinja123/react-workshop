import MovieSearchFunction from "@/app/_componets/dashboardComponets/movieSearch/MovieSearch";
import React from "react";
import { Box } from "@mui/material";
const MovieSearch = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '750px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <MovieSearchFunction />
        </Box>
    );
}
export default MovieSearch; 