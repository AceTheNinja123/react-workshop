/**
 * PaintApp component - A simple drawing application.
 *
 * This component provides a canvas where users can draw with different
 * colors, line widths, and opacities. It includes a menu for adjusting
 * these drawing parameters.
 *
 * @component
 * @returns {JSX.Element} A Box containing the drawing menu and SVG canvas.
 *
 * @example
 * // Usage in a parent component:
 * <PaintApp />
 *
 * @remarks
 * - Uses SVG for drawing paths.
 * - `useState` hooks manage `lineWidth`, `lineColor`, `lineOpacity`,
 *   `paths` (completed strokes), and `currentPath` (stroke being drawn).
 * - `startDraw`, `draw`, and `endDraw` functions handle mouse events for drawing.
 * - The `Menu` component is used to control drawing parameters.
 * 
 * Insperation from: https://www.geeksforgeeks.org/reactjs/paint-app-using-reactjs/
 */

import { useState } from "react";
import { Box, Typography, useTheme} from "@mui/material";
import Menu from "./Menu";
interface Stroke {
    d: string;
    color: string;
    width: number;
    opacity: number;
}
function App() {
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const [paths, setPaths] = useState<Stroke[]>([]);
    const [currentPath, setCurrentPath] = useState("");
const theme = useTheme();
    const startDraw = (e: React.MouseEvent<SVGSVGElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setCurrentPath(`M ${offsetX} ${offsetY}`);
    };

    const draw = (e: React.MouseEvent<SVGSVGElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setCurrentPath(prev => `${prev} L ${offsetX} ${offsetY}`);
    };

    const endDraw = () => {
        if (!currentPath) return;

        setPaths(prev => [
            ...prev,
            {
                d: currentPath,
                color: lineColor,
                width: lineWidth,
                opacity: lineOpacity,
            },
        ]);

        setCurrentPath("");
    };

    return (
        <Box className="paintAppBox">
            <Typography variant="h1" color="primary" sx={{ fontFamily: `'Lobster', cursive`, fontSize: '50px', padding: '20px' }}>Paint App</Typography>
            <Box className="paintAppDrawArea" sx={{borderColor: theme.palette.primary.main}}>
                <Menu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity} />
                <svg
                    width="100%"
                    height={600}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={endDraw}
                >
                    {paths.map((path, i) => (
                        <path
                            key={i}
                            d={path.d}
                            stroke={path.color}
                            strokeWidth={path.width}
                            opacity={path.opacity}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                    {currentPath && (
                        <path
                            d={currentPath}
                            stroke={lineColor}
                            strokeWidth={lineWidth}
                            opacity={lineOpacity}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
            </Box>
        </Box>
    );
}
export default App;