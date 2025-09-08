import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { height, padding } from "@mui/system";
const cardData = [
    { title: "Bedroom 1", image: "/images/hotelPage/hotelpage1.jpg" },
    { title: "Outside Lounge", image: "/images/hotelPage/hotelpage2.jpg" },
    { title: "Outside the Building", image: "/images/hotelPage/hotelpage3.jpg" },
    { title: "Bedroom 2", image: "/images/hotelPage/hotelpage4.jpg" },
    { title: "Restrant", image: "/images/hotelPage/hotelpage5.jpg" }
];

export default function HotelImgesSwiperCarousel() {
    return (
        <Box
            sx={{
                "& .swiper-button-next, & .swiper-button-prev": { color: "black", },
                "& .swiper-pagination": {
                    bottom: "20px", // move it up inside the image
                    zIndex: 10,
                },
                "& .swiper-pagination-bullet": {
                    backgroundColor: "white",
                    opacity: 0.8,
                },
                "& .swiper-pagination-bullet-active": {
                    backgroundColor: "primary.main",
                    opacity: 1,
                },
            }}
        >
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                // autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop
                sx={{ width: "100%", padding: "80px" }}
            >
                {cardData.map((card, cardDataI) => (
                    <SwiperSlide key={cardDataI}>
                        <Card variant="plain" sx={{ margin: "auto" }}>
                            <CardMedia
                                component="img"
                                height="50"
                                image={card.image}
                                alt={card.title}
                            />
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
