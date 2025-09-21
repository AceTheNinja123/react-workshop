import { Box, Typography, useTheme } from "@mui/material";
// Interfaces
interface DragEventWithDataTransfer extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer;
    target: HTMLDivElement;
}
interface DragOverEvent extends React.DragEvent<HTMLDivElement> { }
interface FilledTileProp {
    dragStart: (e: DragEventWithDataTransfer) => void;
    index: number;
    value: number | string;
}
interface EmptyTileProp {
    dragOver: (e: DragOverEvent) => void;
    dropped: (e: DragEventWithDataTransfer) => void;
    index: number;
}

// Draggable tile
export function FilledTile({ index, value, dragStart }: FilledTileProp) {
    const theme = useTheme();
    const color1 = theme.palette.customColors[0];
    const color2 = theme.palette.customColors[4];
    return (
        <Box
            id={`place-${index + 1}`}
            sx={{
                width: 125,
                height: 125,
                borderRadius: 2,
                boxShadow: 3,
                background:
                    index === Number(value) - 1
                        ? "linear-gradient(to right, " + color1 + ",  " + color2 + " )"
                        : (theme) => theme.palette.grey[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                id={`tile-${value}`}
                draggable
                onDragStart={dragStart}
                sx={{
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": { bgcolor: (theme) => theme.palette.grey[700], },
                }}
            >
                {value}
            </Typography>
        </Box>
    );
}

// Drop target tile
export function EmptyTile({ dragOver, dropped, index }: EmptyTileProp) {
    return (
        <Box
            onDragOver={dragOver}
            onDrop={dropped}
            id={`place-${index + 1}`}
            sx={{ width: 125, height: 125, borderRadius: 2, boxShadow: 3, bgcolor: (theme) => theme.palette.grey[800], }}
        />
    );
}
