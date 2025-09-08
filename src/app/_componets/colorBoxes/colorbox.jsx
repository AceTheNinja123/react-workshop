import { useEffect, useState } from "react";

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
    <div
      style={{
        width: "150px",
        height: "150px",
        backgroundColor: color ?? "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
      }}
      onClick={handleClick}
    ></div>
  );
}

export default ColorBox;