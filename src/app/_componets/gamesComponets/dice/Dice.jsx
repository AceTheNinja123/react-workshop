import Die from "./Die";

function Dice({ dice, color = "slateGray", sides = 6, label }) {
  return (
    <div>
      <Die val={dice} color={color} sides={sides} label={label} />
    </div>
  );
}

export default Dice;