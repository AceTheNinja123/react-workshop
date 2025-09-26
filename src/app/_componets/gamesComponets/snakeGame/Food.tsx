import React from "react";
import { Box } from '@mui/material';

const Food = ({ dot }: { dot: number[] }) => {
    return (<Box sx={{ position: "absolute", left: `${dot[0]}%`, top: `${dot[1]}%`, width: "12px", height: "12px", backgroundColor: "white", borderRadius: "20px", zIndex: 1, }} />);
};
export default Food;