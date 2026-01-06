/**
 * Puzzle component that renders a 4x4 grid of tiles for a tile puzzle game.
 * 
 * @component
 * @param {PuzzleProps} props - The component props
 * @param {Array<string | number>} props.shuffledArray - Array of tile values (strings/numbers) and empty strings for empty tiles
 * @param {(e: React.DragEvent<HTMLDivElement>) => void} props.dragOver - Handler for drag over events on empty tiles
 * @param {(e: DragEventWithDataTransfer) => void} props.dragStart - Handler for drag start events on filled tiles
 * @param {(e: DragEventWithDataTransfer) => void} props.dropped - Handler for drop events on empty tiles
 * @returns {JSX.Element} A Material-UI Box component containing a grid of FilledTile and EmptyTile components
 */
import { FilledTile, EmptyTile } from "./Tile";
import { Box } from "@mui/material";

// Interfaces
interface DragEventWithDataTransfer extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer;
    target: HTMLDivElement;
}
interface PuzzleProps {
    shuffledArray: Array<string | number>;
    dragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    dragStart: (e: DragEventWithDataTransfer) => void;
    dropped: (e: DragEventWithDataTransfer) => void;
}

export default function Puzzle({ shuffledArray, dragOver, dragStart, dropped, }: PuzzleProps) {
    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mt: 3, px: 3, borderRadius: 2, }}>
            {shuffledArray.map((value, index) =>
                value === "" ? (<EmptyTile key={index} dragOver={dragOver} dropped={dropped} index={index} />) :
                    (<FilledTile key={index} index={index} value={value} dragStart={dragStart} />)
            )}
        </Box>
    );
}