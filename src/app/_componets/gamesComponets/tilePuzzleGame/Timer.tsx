
/**
 * Timer component that tracks elapsed time for a game.
 * 
 * @component
 * @example
 * const [time, setTime] = useState(0);
 * return <Timer time={time} setTime={setTime} timerActive={true} />
 * 
 * @param {prop} props - The component props
 * @param {number} props.time - The current elapsed time in seconds
 * @param {Dispatch<SetStateAction<number>>} props.setTime - Function to update the time state
 * @param {boolean} props.timerActive - Whether the timer is currently running
 * @returns {JSX.Element} A Typography component displaying the elapsed time in seconds
 */
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
    }, [timerActive, setTime]);

    return <Typography variant="h3">Time: {time}s</Typography>;
}