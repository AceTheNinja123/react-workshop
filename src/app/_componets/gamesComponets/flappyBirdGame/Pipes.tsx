
/**
 * Pipes component for the Flappy Bird game.
 * Renders a pipe obstacle at the specified position.
 * 
 * @component
 * @example
 * const pipePosition = { x: 100, y: 0 };
 * return <Pipes pipePosition={pipePosition} />
 * 
 * @param {PipesProps} props - The component props
 * @param {Object} props.pipePosition - The position coordinates of the pipe
 * @param {number} props.pipePosition.x - The horizontal position (left) of the pipe in pixels
 * @param {number} props.pipePosition.y - The vertical position of the pipe (currently unused)
 * @returns {React.ReactElement} The rendered pipe image element
 */
import Image from "next/image";
import React from "react";

interface PipesProps {
    pipePosition: { x: number; y: number };
}

const Pipes: React.FC<PipesProps> = ({ pipePosition }) => {
    return (
        <Image
            src="https://media.geeksforgeeks.org/wp-content/uploads/20231211115753/6d2a698f31595a1.png"
            alt="pipe-bottom"
            width={100}
            height={600}
            style={{ position: "absolute", left: pipePosition.x, bottom: 0, userSelect: "none", }}
            draggable={false}
            unoptimized
        />
    );
};

export default Pipes;