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