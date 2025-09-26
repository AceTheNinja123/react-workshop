import { useEffect, useState } from "react";
import shuffleArray from "./shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";
import { Box, Button, Alert, Typography, Stack, useTheme } from "@mui/material";
interface DragEventWithDataTransfer extends React.DragEvent<HTMLDivElement> { dataTransfer: DataTransfer; target: HTMLDivElement; }

/* Taken inspiration from https://www.geeksforgeeks.org/reactjs/15-puzzle-game-using-reactjs/ */

export default function Game() {
    const [shuffledArray, setShuffledArray] = useState<Array<string | number> | null>(null);;
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [win, setWin] = useState(false);
    const theme = useTheme()
    const color2 = theme.palette.warning.main;
    const color1 = theme.palette.success.main;
    const color3 = theme.palette.error.main;

    useEffect(() => {
        if (shuffledArray === null) setShuffledArray(shuffleArray());
        if (moves === 1) setTimerActive(true);
        let won = true;
        if (shuffledArray !== null) {
            for (let i = 0; i < shuffledArray.length - 1; i++) {
                const value = Number(shuffledArray[i]);
                if (i == value - 1) continue;
                else {
                    won = false;
                    break;
                }
            }
            if (won) {
                setWin(true);
                setTimerActive(false);
            }
        }
        return;
    }, [moves, shuffledArray]);

    const newGame = () => {
        setMoves(0);
        setTimerActive(false);
        setTime(0);
        setShuffledArray(shuffleArray());
        setWin(false);
    };

    const dragStart = (e: DragEventWithDataTransfer) =>
        e.dataTransfer.setData("tile", e.target.id);

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const dropped = (e: DragEventWithDataTransfer) => {
        e.preventDefault();
        const tile = e.dataTransfer.getData("tile");
        const oldPlace =
            Number(document.getElementById(tile)?.parentElement?.id.slice(6)) - 1;
        const newPlace = Number(e.target.id.slice(6)) - 1;

        // Allow only adjacent moves
        if (!(Math.abs(oldPlace - newPlace) === 4 || Math.abs(oldPlace - newPlace) === 1)) {
            return;
        }

        const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
        if (shuffledArray !== null) {
            setShuffledArray([
                ...shuffledArray.slice(0, i),
                shuffledArray[j],
                ...shuffledArray.slice(i + 1, j),
                shuffledArray[i],
                ...shuffledArray.slice(j + 1),
            ]);
            setMoves((prev) => prev + 1);
        }
    };

    return (
        <Box sx={{ height: '750px', alignContent: "center", justifyContent: "center", }}>
            <Stack spacing={2}>
                {win && (<Alert severity="success" variant="filled">🎉 HURRAY!! You have won the game</Alert>)}

                {/* Header: Moves + Timer */}
                <Box display="flex" justifyContent="space-between" alignItems="center" px={2}                >
                    <Typography variant="h2">Moves: {moves}</Typography>
                    <Timer time={time} timerActive={timerActive} setTime={setTime} />
                </Box>

                {/* Puzzle Board */}
                {shuffledArray && <Puzzle shuffledArray={shuffledArray} dragStart={dragStart} dragOver={dragOver} dropped={dropped} />}

                {/* New Game Button */}
                <Button
                    fullWidth
                    onClick={newGame}
                    variant="contained"
                    size="large"
                    sx={{
                        fontWeight: "bold",
                        background: "linear-gradient(90deg," + color1 + " 10%, " + color2 + " 30%," + color3 + "  90%)",
                    }}
                >
                    New Game
                </Button>
            </Stack>
        </Box>
    );
}
