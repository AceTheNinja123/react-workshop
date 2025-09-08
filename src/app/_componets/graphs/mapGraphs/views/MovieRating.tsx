"use client"
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid";

//layout
import MovieRatingChart from "@/app/_componets/amCharts/column/MovieRatingChart"
//interface
interface dataType { category: string; y: number; name: string; }
const MovieRatingLayout = () => {
    const [lowNum, setLowNum] = useState<number>(100);
    const [highNum, setHighNUm] = useState<number>(0);
    const [averageNum, setAverageNum] = useState<number>(0);
    const movieData: dataType[] = useMemo(() => ([{ category: "Action", y: 25, name: "Explosive Action" }, { category: "Drama", y: 50, name: "Emotional Story" }, { category: "Comedy", y: 80, name: "Funny Moments" }, { category: "Horror", y: 30, name: "Scary Tales" }, { category: "Romance", y: 55, name: "Love Stories" }, { category: "Sci-Fi", y: 90, name: "Futuristic Worlds" }, { category: "Documentary", y: 20, name: "Real Stories" }, { category: "Fantasy", y: 60, name: "Magical Worlds" }, { category: "Thriller", y: 85, name: "Edge of Seat" }, { category: "Animation", y: 45, name: "Family Fun" },]), []);
    useEffect(() => {
        let sumTotal = 0;
        movieData.map((value) => {
            if (value.y < lowNum) { setLowNum(value.y) };
            if (value.y > highNum) { setHighNUm(value.y) };
            sumTotal = sumTotal + value.y;
        })
        if (sumTotal > 0) setAverageNum(sumTotal / movieData.length)
    }, [movieData, lowNum, highNum]);
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignItems: 'center', justifyItems: 'center' }}>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <MovieRatingChart movieData={movieData} lowNum={lowNum} highNum={highNum} averageNum={averageNum} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                    <Box width="100%" height="50px" bgcolor="error.main" display="flex" alignItems="center" sx={{ justifyContent: 'space-between', padding: 2 }} >
                        <Typography variant="h6">Lowest Number:</Typography>
                        <Typography variant="h6">{lowNum}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                    <Box width="100%" height="50px" bgcolor="success.main" display="flex" alignItems="center" sx={{ justifyContent: 'space-between', padding: 2 }} >
                        <Typography variant="h6">Highest Number:</Typography>
                        <Typography variant="h6">{highNum}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                    <Box width="100%" height="50px" bgcolor="info.main" display="flex" alignItems="center" sx={{ justifyContent: 'space-between', padding: 2 }} >
                        <Typography variant="h6">Average Number:</Typography>
                        <Typography variant="h6">{averageNum}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
export default MovieRatingLayout; 