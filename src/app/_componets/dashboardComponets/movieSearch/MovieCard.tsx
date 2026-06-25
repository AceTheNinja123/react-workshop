/**
 * MovieCard.tsx
 *
 * This component displays a single movie card with its title, year, type, and poster.
 * It handles cases where the movie poster is not available by displaying a fallback image.
 *
 * Features:
 * - Displays movie title, year, and type.
 * - Shows the movie poster.
 * - Provides a fallback image if the poster is "N/A" or fails to load.
 * - Uses Material-UI for styling and layout.
 * - Includes hover effects for an interactive user experience.
 */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IconPolaroid } from '@tabler/icons-react';
import { getPoster, savePoster } from "@/utils/posterCache";

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const MovieCard = ({ movie, priority = false }: { movie: Movie, priority?: boolean }) => {
    const [imgError, setImgError] = useState(false);
    const showFallback = movie.Poster === "N/A" || imgError;
    const [poster, setPoster] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    function getAlternativePoster(imdbID: string) {
        return `https://img.omdbapi.com/?apikey=fe2f6c44&i=${imdbID}`;
    }
    useEffect(() => {
        const cached = getPoster(movie.imdbID);
        if (cached !== undefined && cached !== null) { setPoster(cached); }
        else if (movie.Poster !== "N/A") { setPoster(movie.Poster); }
    }, [movie]);

    return (
        <Box
            sx={{
                width: 210,
                height: 360,
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 3,
                margin: 2,
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0, 1)",
                "&:hover": { transform: "scale(1.05)", boxShadow: 8, },
                "&:hover .overlay": { opacity: 1, },
                "&:hover .poster": { opacity: 0.3, },
                "&:hover .content": { backgroundColor: "transparent", },
            }}
        >
            {/* Overlay (Year) */}
            <Box className="overlay" sx={{ position: "absolute", top: 0, width: "100%", p: 2, opacity: 0, zIndex: 2, transition: "opacity 0.3s ease", color: "#f9d3b4", }}>
                <Typography variant="h6">{movie.Year}</Typography>
            </Box>

            {/* Poster */}
            <Box className="poster" sx={{ height: "100%", position: "relative", transition: "opacity 0.3s ease" }}>
                {showFallback || imgError || poster === null ? (
                    <Box sx={{ objectFit: "cover", height: "100%", width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'center', backgroundColor: '#222222', paddingTop: '40px' }}>
                        <IconPolaroid size={150} style={{ color: '#777777' }} />
                        <Typography variant="body1" sx={{ color: '#777777' }}>No Image</Typography>
                    </Box>
                ) : (
                    <Image
                        src={poster}
                        alt={movie.Title}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                        priority={priority}
                        onLoad={() => savePoster(movie.imdbID, poster)}
                        onError={() => {
                            if (retryCount === 0) {
                                // Try alternative OMDb image endpoint
                                const fallback = getAlternativePoster(movie.imdbID);
                                setRetryCount(1);
                                setPoster(fallback);
                            } else {
                                // Final failure → cache null and show fallback UI
                                savePoster(movie.imdbID, null);
                                setPoster(null);
                                setImgError(true);
                            }
                        }}
                    />
                )}
            </Box>

            {/* Bottom Content */}
            <Box
                className="content"
                sx={{
                    height: "30%",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    p: "16px 24px 24px",
                    backgroundColor: "#343739",
                    transition: "background-color 0.3s ease",
                    zIndex: 3,
                }}
            >
                <Typography variant="body2" sx={{ textTransform: "uppercase", letterSpacing: 2, fontWeight: 500, color: "#f0f0f0", }}>{movie.Type}</Typography>
                <Typography variant="h6" sx={{ mt: 0.5, fontFamily: `"Roboto Slab", serif`, color: "#f9d3b4", }}>{movie.Title}</Typography>
            </Box>
        </Box>
    );
};

export default MovieCard;
