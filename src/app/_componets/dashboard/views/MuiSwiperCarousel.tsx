import MuiSwiperCarouselFunction from "@/app/_componets/carouselImages/MuiSwiperCarousel";
import React from "react";
import { Box } from "@mui/material";
const MuiSwiperCarousel = () => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '740px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <MuiSwiperCarouselFunction/>
        </Box>
    );
}
export default MuiSwiperCarousel; 