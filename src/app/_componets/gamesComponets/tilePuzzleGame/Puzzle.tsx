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