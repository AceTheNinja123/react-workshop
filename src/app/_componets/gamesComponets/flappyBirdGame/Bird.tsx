/**
 * Bird component for the Flappy Bird game.
 * Renders a bird image at the specified position using absolute positioning.
 * 
 * @component
 * @param {BirdProps} props - The component props
 * @param {Object} props.birdPosition - The current position of the bird
 * @param {number} props.birdPosition.x - The horizontal position (left) of the bird in pixels
 * @param {number} props.birdPosition.y - The vertical position (top) of the bird in pixels
 * @returns {React.ReactElement} The rendered bird image element
 * 
 * @example
 * const birdPos = { x: 100, y: 200 };
 * <Bird birdPosition={birdPos} />
 */
import React from "react";
import Image from "next/image";
interface BirdProps { birdPosition: { x: number; y: number }; }
const Bird = ({ birdPosition }: BirdProps) => {

    return (
        <Image
            src="https://media.geeksforgeeks.org/wp-content/uploads/20231211115925/flappy_bird_by_jubaaj_d93bpnj.gif"
            alt="bird"
            width={50}
            height={50}
            style={{ left: birdPosition.x, top: birdPosition.y, position: 'absolute', userSelect: 'none', }}
            draggable={true}
            unoptimized
        />
    );
};

export default Bird;