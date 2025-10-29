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