"use client";
import { styled } from '@mui/system';

const Style = () => {
    const MainWrapper = styled("div")(() => ({
        display: "flex",
        minHeight: "100vh",
        width: "100%",
    }));
    
    return {
        MainWrapper,
    };
}

export default Style;