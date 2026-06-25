
/**
 * StackVisualizer Component
 * 
 * A visual interactive component that demonstrates stack data structure operations (push, pop, reset).
 * Provides real-time visualization of stack elements with animations and state tracking.
 * 
 * @component
 * 
 * @returns {React.ReactElement | null} The rendered stack visualizer UI or null during hydration
 * 
 * @example
 * ```tsx
 * <StackVisualizer />
 * ```
 * 
 * @remarks
 * - Uses Material-UI components for styling and theming support
 * - Implements hydration safety with mounted state check
 * - Maximum stack size is 5 elements
 * - Animations trigger on push/pop operations with theme-based colors
 * - Supports both light and dark theme modes
 * - Displays error messages with visual feedback for invalid operations (overflow/underflow)
 * - Inspired by GeeksforGeeks stack visualizer tutorial
 * 
 * @features
 * - Push: Add a numeric value to the top of the stack
 * - Pop: Remove and display the top element
 * - Reset: Clear all stack data and messages
 * - Real-time stack state tracking (size, top element, last operations)
 * - Animated transitions with theme-aware color palette
 * - Error handling with visual feedback for stack overflow/underflow conditions
 */
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Input, useTheme, Button } from "@mui/material";
import { styled, css, keyframes } from "@mui/material/styles";

// --- Component ---
const StackVisualizer = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const [stack, setStack] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [lastPushed, setLastPushed] = useState<string | null>(null);
    const [lastPopped, setLastPopped] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [anim, setAnim] = useState<"push" | "pop" | null>(null);
    const MAX_SIZE = 5;
    const theme = useTheme();
    const customColors = theme.palette.customColors;
    const mode = theme.palette.mode;
    const modeColor = mode === "dark" ? "#fff" : "#000";

    // --- Keyframes (inside component, using theme) ---
    const pushAnimation = keyframes`
      0% { background-color: ${customColors[Math.floor(Math.random() * customColors.length)]}; }
      100% { background-color: ${customColors[Math.floor(Math.random() * customColors.length)]}; }
    `;

    const popAnimation = keyframes`
      0% { background-color: ${customColors[Math.floor(Math.random() * customColors.length)]}; }
      100% { background-color: ${customColors[Math.floor(Math.random() * customColors.length)]}; }
    `;

    const errorAnimation = keyframes`
      0% { background-color: ${theme.palette.warning.light}; }
      100% { background-color: ${theme.palette.error.main}; }
    `;

    // --- Styled Components (now inside component) ---
    const StyledButton = styled(Button)(({ theme }) => ({
        height: "50px",
        width: "140px",
        fontSize: "25px",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "0.2s",
        border: "none",
        "&:disabled": { backgroundColor: theme.palette.primary.dark + "!important", },
    }));

    const StackBox = styled(Box) <{ anim?: "push" | "pop" | string |null; backgroundColor?: string; color?: string; }>`
      height: 80px;
      width: 170px;
      border: 4px solid;
      border-radius: 10px;
      font-size: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      ${({ anim }) =>
            anim === "push"
                ? css`animation: ${pushAnimation} 0.3s ease;`
                : anim === "pop"
                    ? css`animation: ${popAnimation} 0.3s ease;`
                    : css``}
    `;

    const MessageBox = styled(Box) <{ anim?: "error" | null; color?: string }>`
      height: 60%;
      width: 100%;
      margin-top: 30px;
      padding: 10px;
      border-radius: 10px;
      ${({ color }) => color && `background-color: ${color};`}
      display: flex;
      flex-direction: column;
      overflow: hidden;
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      ${({ anim }) => anim === "error" ? css`animation: ${errorAnimation} 0.4s linear;` : css``}
    `;

    // ⛔️ Prevent hydration mismatch before mount
    if (!mounted) return null;

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
            <Typography variant="h3" color="primary.main" sx={{ mb: 5 }}>Stack Visualizer</Typography>
            <Typography variant="h3" color="primary.main" sx={{ mb: 5 }}>Stack Visualizer</Typography>

            <Box sx={{ height: "620px", width: "100%", border: "2px solid", borderColor: theme.palette.primary.main, borderRadius: "20px", padding: 5, overflow: "hidden", }}>
                {/* --- Controls --- */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mt: 2 }}>
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        sx={{ height: "50px", width: "400px", fontSize: "25px", borderRadius: "10px", paddingLeft: "20px", }}
                    />
                    <StyledButton variant="contained" onClick={handlePush}>Push</StyledButton>
                    <StyledButton variant="contained" onClick={handlePop}>Pop</StyledButton>
                    <StyledButton variant="contained" onClick={handleReset}>Reset</StyledButton>
                </Box>

                {/* --- Stack and Info --- */}
                <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
                    {/* Stack */}
                    <Box
                        sx={{
                            width: "300px",
                            height: "470px",
                            border: "4px solid",
                            borderColor: modeColor,
                            borderTop: "none",
                            borderRadius: "0 0 10px 10px",
                            display: "flex",
                            flexDirection: "column-reverse",
                            alignItems: "center",
                            paddingBottom: "5px",
                            marginRight: "10px",
                        }}
                    >
                        {stack.map((item, index) => (
                            <StackBox
                                key={index}
                                anim={
                                    anim === "push" ? `animation: ${pushAnimation} 0.3s ease;`
                                        : anim === "pop" ? `animation: ${popAnimation} 0.3s ease;`
                                            : ""
                                }
                                backgroundColor={theme.palette.primary.main}
                                color={modeColor}
                            >
                                {item}
                            </StackBox>
                        ))}
                    </Box>

                    {/* Info */}
                    <Box sx={{ width: "400px", overflow: "hidden", wordBreak: "break-all", wordWrap: "break-word", whiteSpace: "normal", }}>
                        <Typography variant="h5">Top of Stack: {stack.at(-1) ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Last Pushed: {lastPushed ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Last Popped: {lastPopped ?? "-"}</Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>Stack Size: {stack.length}</Typography>

                        <MessageBox anim={error ? "error" : undefined} color={theme.palette.primary.main}>
                            <Typography variant="h4" sx={{ textAlign: "center", color: modeColor }}>Message Box</Typography>
                            <Typography sx={{ fontSize: "24px", textAlign: "center", mt: 1 }} color={error ? "red" : modeColor}>{message}</Typography>
                        </MessageBox>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default StackVisualizer;