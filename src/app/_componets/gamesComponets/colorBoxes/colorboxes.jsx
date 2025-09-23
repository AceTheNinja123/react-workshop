import ColorBox from "./colorbox";
function ColorBoxes({ colors }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)",height:'750px', width: "750px", margin: "auto", }}>
      {Array.from({ length: 25 }).map((_, index) => (
        <ColorBox key={index} colors={colors} />
      ))}
    </div>
  );
}
export default ColorBoxes;