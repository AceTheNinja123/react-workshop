import { useEffect, SetStateAction, Dispatch } from "react";
import { Typography } from "@mui/material";
//interfaces
interface prop { time: number; setTime: Dispatch<SetStateAction<number>>; timerActive: boolean; }

export default function Timer({ time, setTime, timerActive }: prop) {
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined = undefined;
        if (timerActive)
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        else { clearInterval(interval); };
        return () => { clearInterval(interval); };
    }, [timerActive]);

    return <Typography variant="h3">Time: {time}s</Typography>;
}