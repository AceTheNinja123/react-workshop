import { Box, Typography, useTheme } from "@mui/material";
// Interfaces
interface DragEventWithDataTransfer extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer;
    target: HTMLDivElement;
}
interface FilledTileProp {
    dragStart: (e: DragEventWithDataTransfer) => void;
    index: number;
    value: number | string;
}
interface EmptyTileProp {
    dragOver: (e:React.DragEvent<HTMLDivElement>) => void;
    dropped: (e: DragEventWithDataTransfer) => void;
    index: number;
}

// Draggable tile
export function FilledTile({ index, value, dragStart }: FilledTileProp) {
    const theme = useTheme();
    const color1 = theme.palette.primary.main;
    const color2 = theme.palette.secondary.main;
    const color1Dark = theme.palette.primary.dark;
    const color2Dark = theme.palette.secondary.dark;
    return (
        <Box
            id={`place-${index + 1}`}
            sx={{
                width: 125,
                height: 125,
                borderRadius: 2,
                boxShadow: 3,
                background: index === Number(value) - 1 ? "linear-gradient(to right, " + color1 + ",  " + color2 + " )" : (theme) => theme.palette.grey[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { bgcolor: "linear-gradient(to right, " + color1Dark + ",  " + color2Dark + " )" },
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
                    "&:hover": { bgcolor: "linear-gradient(to right, " + color1Dark + ",  " + color2Dark + " )", },
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
