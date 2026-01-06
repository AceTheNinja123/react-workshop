
/**
 * Represents a single face of a coin with display properties.
 * @interface CoinFace
 * @property {string} side - The name/identifier of the coin face (e.g., "heads", "tails")
 * @property {string} [imgSrc] - Optional image source URL for the coin face
 * @property {React.ElementType} [icon] - Optional React icon component to display
 */

/**
 * Props for the Coin component.
 * @interface CoinProps
 * @property {CoinFace | null} face - The coin face data to display, or null if no face is selected
 */

/**
 * Displays a coin face with an optional icon in a circular container.
 * The component adapts its styling based on the current theme mode (dark/light).
 * 
 * @component
 * @example
 * const coinFace = { side: 'heads', icon: HeadsIcon };
 * return <Coin face={coinFace} />
 * 
 * @param {CoinProps} props - The component props
 * @param {CoinFace | null} props.face - The coin face to display
 * @returns {React.ReactElement} A styled Box containing the coin face icon
 */
import React from 'react';
import { Box, useTheme } from "@mui/material";
//import Image from "next/image";

interface CoinFace { side: string; imgSrc?: string; icon?: React.ElementType; }
interface CoinProps { face: CoinFace | null; }

const Coin: React.FC<CoinProps> = ({ face }) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const color = mode === 'dark' ? "#fff" : "#000"
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* {face && (<Image src={face.imgSrc} alt={face.side} width={200} height={200} />)} */}
            {/* {face && (<Box component="img" src={face.imgSrc} alt={face.side} sx={{ width: "200px", height: "200px", objectFit: "contain", display: "block", userSelect: "none", }} />)} */}
            {face && (
                <Box sx={{ objectFit: "contain", display: "flex", width: "200px", height: "200px", margin:2, border: "5px solid", borderColor: color, borderRadius: "50%", alignItems: "center", justifyContent: "center", }}>
                    {face.icon && <face.icon size={150} color={color}/>}
                </Box>
            )}
        </Box>
    );
};

export default Coin;
