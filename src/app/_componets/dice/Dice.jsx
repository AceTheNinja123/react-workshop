import Die from "./Die";

function Dice({ dice, color = "slateGray" }) {
  return (
    <div>
      {dice.map((v, i) => (
        <Die key={i} val={v} color={color} />
      ))}
    </div>
  );
}
export default Dice;
