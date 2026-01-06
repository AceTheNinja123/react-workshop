
/**
 * Dice component that renders a single die.
 * @component
 * @param {Object} props - Component props
 * @param {number} props.dice - The value of the die
 * @param {string} [props.color="slateGray"] - The color of the die
 * @param {number} [props.sides=6] - The number of sides on the die
 * @param {string} props.label - The label for the die
 * @returns {JSX.Element} A div containing the Die component
 */
import Die from "./Die";

function Dice({ dice, color = "slateGray", sides = 6, label }) {
  return (
    <div>
      <Die val={dice} color={color} sides={sides} label={label} />
    </div>
  );
}

export default Dice;