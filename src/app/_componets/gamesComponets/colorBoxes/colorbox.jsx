
/**
 * ColorBox Component
 * 
 * A clickable box component that displays a random color from a provided array.
 * Clicking the box changes to a new random color.
 * 
 * @component
 * @example
 * const colors = ['#FF5733', '#33FF57', '#3357FF'];
 * return <ColorBox colors={colors} />
 * 
 * @param {Object} props - Component props
 * @param {string[]} props.colors - Array of color values (hex, rgb, or color names)
 * @returns {JSX.Element} A Material-UI Box element with random background color and click handler
 */
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