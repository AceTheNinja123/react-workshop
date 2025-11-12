import React, { useState } from "react";
import { Box, Typography, Input, styled, useTheme, Button } from "@mui/material";
import { keyframes } from "@emotion/react";

// --- Keyframes ---
const pushAnimation = keyframes`
  0% { background-color: green; }
  100% { background-color: rgb(17, 92, 255); }
`;

const popAnimation = keyframes`
  0% { background-color: green; }
  100% { background-color: rgb(255, 15, 59); }
`;

const errorAnimation = keyframes`
  0% { background-color: bisque; }
  100% { background-color: rgb(255, 15, 59); }
`;

// --- Styled Components ---
const StyledButton = styled(Button)(({ theme }) => ({
    height: "50px",
    width: "140px",
    fontSize: "25px",
    backgroundColor: theme.palette.primary.light,
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.2s",
    border: "none",
    "&:disabled": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const StackBox = styled(Box) <{ anim?: string }>`
  height: 80px;
  width: 170px;
  background-color: green;
  color: white;
  border: 4px solid black;
  border-radius: 10px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  ${({ anim }) =>
        anim &&
        `
    animation: ${anim} 0.3s ease;
  `}
`;

const MessageBox = styled(Box) <{ anim?: string, color?: string }>`
  height: 60%;
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  border-radius: 10px;
  ${({ color }) =>
        color &&
        `
    background-color: ${color};
  `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ anim }) =>
        anim &&
        `
    animation: ${anim} 0.4s linear;
  `}
`;

// --- Component ---
const StackVisualizer = () => {
    const [stack, setStack] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [lastPushed, setLastPushed] = useState<string | null>(null);
    const [lastPopped, setLastPopped] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [anim, setAnim] = useState<"push" | "pop" | null>(null);
    const MAX_SIZE = 5;
    const theme = useTheme();
    const handlePush = () => {
        if (!inputValue.trim()) {
            triggerError("Please enter a value.");
            return;
        }
        if (stack.length >= MAX_SIZE) {
            triggerError("Stack Overflow!");
            return;
        }

        const newStack = [...stack, inputValue];
        setStack(newStack);
        setLastPushed(inputValue);
        setMessage(`Item ${inputValue} pushed.`);
        setInputValue("");
        setAnim("push");
    };

    const handlePop = () => {
        if (stack.length === 0) {
            triggerError("Stack Underflow!");
            return;
        }

        const popped = stack[stack.length - 1];
        const newStack = stack.slice(0, -1);
        setStack(newStack);
        setLastPopped(popped);
        setMessage(`Item ${popped} popped.`);
        setAnim("pop");
    };

    const handleReset = () => {
        setStack([]);
        setLastPopped(null);
        setLastPushed(null);
        setMessage("");
        setError(false);
    };

    const triggerError = (msg: string) => {
        setMessage(msg);
        setError(true);
        setTimeout(() => setError(false), 1000);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3" color="success.main" sx={{ mb: 5 }}>Stack Visualizer</Typography>

            <Box sx={{ height: "620px", width: "100%", border: "2px solid", borderColor: theme.palette.primary.main, borderRadius: "20px", padding: 5, overflow: "hidden", }}>
                {/* --- Controls --- */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mt: 2 }}>
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        sx={{ height: "50px", width: "400px", fontSize: "25px", borderRadius: "10px", paddingLeft: "20px", }}
                    />
                    <StyledButton onClick={handlePush}>Push</StyledButton>
                    <StyledButton onClick={handlePop}>Pop</StyledButton>
                    <StyledButton onClick={handleReset}>Reset</StyledButton>
                </Box>

                {/* --- Stack and Info --- */}
                <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
                    {/* Stack */}
                    <Box
                        sx={{
                            width: "300px",
                            height: "470px",
                            border: "4px solid black",
                            borderTop: "none",
                            borderRadius: "0 0 10px 10px",
                            display: "flex",
                            flexDirection: "column-reverse",
                            alignItems: "center",
                            paddingBottom: "5px",
                        }}
                    >
                        {stack.map((item, index) => (
                            <StackBox
                                key={index}
                                anim={anim === "push" && index === stack.length - 1 ? pushAnimation.toString() : anim === "pop" && index === stack.length - 1 ? popAnimation.toString() : undefined}
                            >
                                {item}
                            </StackBox>
                        ))}
                    </Box>

                    {/* Info */}
                    <Box sx={{ width: "400px" }}>
                        <Typography variant="h5">Top of Stack: {stack.at(-1) ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Last Pushed: {lastPushed ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Last Popped: {lastPopped ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Stack Size: {stack.length}</Typography>

                        <MessageBox anim={error ? errorAnimation.toString() : undefined} color={theme.palette.primary.main}>
                            <Typography variant="h4" sx={{ textAlign: "center", color: "black" }}>Message Box</Typography>
                            <Typography sx={{ fontSize: "24px", textAlign: "center", mt: 1 }} color={error ? "red" : "black"}>{message}</Typography>
                        </MessageBox>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default StackVisualizer;