// Bird.js
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