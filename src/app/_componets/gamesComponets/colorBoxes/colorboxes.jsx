
/**
 * ColorBoxes component
 * @component
 * Renders a grid of 25 color boxes
 * @param {Object} props - Component props
 * @param {Array<string>} props.colors - Array of color values to be passed to each ColorBox
 * @returns {React.ReactElement} A Material-UI Box containing a 5x5 grid of ColorBox components
 */
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