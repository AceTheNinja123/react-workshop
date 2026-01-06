
/**
 * Renders a food item for the snake game.
 * @param {Object} props - The component props
 * @param {number[]} props.dot - An array containing [x, y] coordinates as percentages for positioning the food element
 * @returns {React.ReactElement} A Box component representing the food with absolute positioning
 */
import React from "react";
import { Box } from '@mui/material';

const Food = ({ dot }: { dot: number[] }) => {
    return (<Box sx={{ position: "absolute", left: `${dot[0]}%`, top: `${dot[1]}%`, width: "12px", height: "12px", backgroundColor: "white", borderRadius: "20px", zIndex: 1, }} />);
};
export default Food;