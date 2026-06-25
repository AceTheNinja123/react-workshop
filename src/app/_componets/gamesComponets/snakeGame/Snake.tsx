
/**
 * Renders the snake game entity as a series of connected segments.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {number[][]} props.snakeDots - Array of [x, y] coordinate pairs representing each segment of the snake body, where coordinates are percentages of the container
 * @returns {React.ReactElement} A Box component containing positioned segments that form the snake
 * 
 * @example
 * const snakeDots = [[50, 50], [48, 50], [46, 50]];
 * <Snake snakeDots={snakeDots} />
 */
import React from "react";
import { Box, useTheme, } from "@mui/material";

const Snake = ({ snakeDots }: { snakeDots: number[][] }) => {
        const theme = useTheme();
        const backgroundColor = theme.palette.greenCustomColors[0]
    return (
        <Box>
            {snakeDots.map((dot, i) => {
                return (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            width: "2%",
                            height: "2%",
                            backgroundColor: backgroundColor,
                            border: "1px solid white",
                            zIndex: 2,
                            left: `${dot[0]}%`,
                            top: `${dot[1]}%`,
                            "@media (max-width:800px)": { width: "12px", height: "12px", },
                        }}
                        className="snake"
                    />
                );
            })}
        </Box>
    );
};
export default Snake;