import ColorBox from "./colorbox";
import { Box } from "@mui/material";
function ColorBoxes({ colors }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", height: '750px', width: "750px",}}>
      {Array.from({ length: 25 }).map((_, index) => (
        <ColorBox key={index} colors={colors} />
      ))}
    </Box>
  );
}
export default ColorBoxes;