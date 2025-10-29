import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function ranColor(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function ColorBox({ colors }) {
  const [color, setColor] = useState(null);

  // Only run after hydration to avoid SSR mismatch
  useEffect(() => {
    setColor(ranColor(colors));
  }, [colors]);

  const handleClick = () => {
    const newColor = ranColor(colors);
    setColor(newColor);
  };

  return (
    <Box sx={{ width: "150px", height: "150px", backgroundColor: color ?? "transparent", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0px", transition: "background-color 0.3s ease", }} onClick={handleClick}></Box>
  );
}

export default ColorBox;