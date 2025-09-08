import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const cardData = [
    { title: "Greater Kudu", image: "/images/wildlife/greater_kudo.jpg", description: "The greater kudu is a large woodland antelope found in eastern and southern Africa, standing over 5 feet tall at the shoulder." },
    { title: "Red Hartebeest", image: "/images/wildlife/red_hartebeest.jpg", description: "It is a large, reddish-fawn antelope with a sloping back and long, narrow face. Both males and females possess heavily ringed horns. " },
    { title: "Common Warthog", image: "/images/wildlife/common_warthog.jpg", description: "They are commonly found in open or semi-open habitats in the African Bush and are identified by their dull grey color and naked skin." },
    { title: "Black-headed Heron", image: "/images/wildlife/black_headed_heron.jpg", description: "It is a large, gray heron with a distinctive dark cap and nape that contrasts with its white throat." },
    { title: "African bush elephant", image: "/images/wildlife/african_bush_elephant.jpg", description: "The African bush elephant is the largest living species of elephant and the biggest terrestrial animal on Earth. " }
];

export default function MuiCardCarousel() {
    return (
        <Box

            sx={{
                "& .swiper-button-next, & .swiper-button-prev": { color: "black", },
                "& .swiper-pagination-bullet, & .swiper-pagination-bullet-active": { borderRadius: "30%", width: "15px", height: "10px", },
            }}
        >
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={15}
                slidesPerView={1}
                navigation
                // autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop
                sx={{ width: "100%" }}
            >
                {cardData.map((card, cardDataI) => (
                    <SwiperSlide key={cardDataI}>
                        <Card variant="plain" sx={{ margin: "auto", paddingBottom: "15px" }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={card.image}
                                alt={card.title}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
