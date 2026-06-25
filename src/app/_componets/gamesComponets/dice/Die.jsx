
/**
 * Die component - Renders a polyhedral die with a specified number of sides and value
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.val - The value displayed on the die
 * @param {string} props.color - The background color of the die
 * @param {number} props.sides - The number of sides on the die (4, 6, 8, 10, 12, or 20)
 * @param {string} props.label - The label text displayed above the die
 * @returns {React.ReactElement} A Box component containing the die shape and value
 * 
 * @example
 * <Die val={15} color="#FF5733" sides={20} label="D20" />
 */
import { Box, Typography, } from "@mui/material";
import React from "react";
function Die({ val, color, sides, label }) {
  const getShapeStyle = () => {
    switch (sides) {
      case 4: // D4 (triangle)
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        };
      case 8: // D8
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        };
      case 10: // D10
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 0% 80%, 50% 100%, 100% 80%)",
        };
      case 12: // D12
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        };
      case 20: // D20 (circle)
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          rotation: "45deg",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        };
      default: // D6
        return {
          width: "6em",
          height: "6em",
          backgroundColor: color,
          borderRadius: "10px",
        };
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>{label}</Typography>
      <Box
        sx={{
          ...getShapeStyle(),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "2em",
          color: "white",
          margin: "0.5em auto",

        }}
      >
        {val}
      </Box>
    </Box>
  );
}

export default Die;