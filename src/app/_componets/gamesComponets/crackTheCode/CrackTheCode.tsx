
/**
 * CrackTheCode Component
 * 
 * A game component where users attempt to guess three hidden numbers (A, B, C)
 * based on provided hints. Each hint gives clues about whether numbers are correct
 * and/or correctly positioned.
 * 
 * @component
 * @returns {React.ReactElement} The rendered game interface with input fields, hints, and feedback
 * 
 * @example
 * ```tsx
 * <CrackTheCode />
 * ```
 * 
 * @inspiration Based on: https://www.geeksforgeeks.org/javascript/crack-the-code-game-using-javascript/
 * 
 * @state {Hint[]} hints - Array of hint objects containing numbers and clue text
 * @state {Object} inputs - User input values for fields A, B, and C
 * @state {string} message - Feedback message displayed after checking the answer
 * @state {Object} solution - The correct solution containing num1, num2, and num3
 * 
 * @interface Hint
 * @property {number} id - Unique identifier for the hint
 * @property {number[]} numbers - Array of three numbers displayed in the hint
 * @property {string} text - Descriptive text providing a clue
 */
"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Card, CardHeader, CardContent, } from "@mui/material";
import Grid from "@mui/material/Grid";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
interface Hint { id: number; numbers: number[]; text: string; }

/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/crack-the-code-game-using-javascript/ */

const CrackTheCode = () => {
    const [hints, setHints] = useState<Hint[]>([]);
    const [inputs, setInputs] = useState({ a: "", b: "", c: "" });
    const [message, setMessage] = useState("");
    const [solution, setSolution] = useState({ num1: 0, num2: 0, num3: 0 });

    // 🔹 Generate random numbers and hints once when mounted
    useEffect(() => {
        const digit = 100;

        const num1 = Math.floor(Math.random() * digit);
        const num2 = Math.floor(Math.random() * digit);
        const num3 = Math.floor(Math.random() * digit);

        const hintData = [
            { id: 1, numbers: [Math.floor(Math.random() * digit), Math.floor(Math.random() * digit), num3], text: "One number is correct and well placed", },
            { id: 2, numbers: [Math.floor(Math.random() * digit), Math.floor(Math.random() * digit), num2], text: "One number is correct but wrong placed", },
            { id: 3, numbers: [num2, num1, Math.floor(Math.random() * digit)], text: "Two numbers are correct but wrong placed", },
            { id: 4, numbers: [Math.floor(Math.random() * digit), Math.floor(Math.random() * digit), Math.floor(Math.random() * digit),], text: "Nothing is Correct", },
            { id: 5, numbers: [Math.floor(Math.random() * digit), Math.floor(Math.random() * digit), num1,], text: "One Number is correct but wrong placed", },
        ];

        setHints(hintData);
        setSolution({ num1, num2, num3 });
    }, []);

    //const digit = 100;
    // 🔹 Handle user input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // 🔹 Handle checking the guess
    const checkAnswer = () => {
        const { a, b, c } = inputs;

        if (a === "" || b === "" || c === "") {
            setMessage("⚠️ Fill all fields!");
            return;
        }

        if (parseInt(a) === solution.num1 && parseInt(b) === solution.num2 && parseInt(c) === solution.num3) { setMessage("🎉 You cracked it!"); }
        else { setMessage("❌ Try once again!"); }
    };

    return (
        <Box sx={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
            <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>CRACK THE CODE</Typography>
                {/*<!-- 3 input fields -->*/}
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center", alignItems: "center", gap: 1, }}>
                    <TextField label="A" name="a" value={inputs.a} onChange={handleChange} type="number" sx={{ width: 80 }} />
                    <TextField label="B" name="b" value={inputs.b} onChange={handleChange} type="number" sx={{ width: 80 }} />
                    <TextField label="C" name="c" value={inputs.c} onChange={handleChange} type="number" sx={{ width: 80 }} />
                </Box>
                <Button variant="contained" onClick={checkAnswer} sx={{ width: 80, height: 56, bgcolor: "#007bff", mt: 2, }}>Check</Button>
                {/* <!-- Hints starts --> */}
                <Grid container spacing={2} justifyContent="center">
                    {hints.map((hint) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={hint.id}>
                            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                                <CardHeader
                                    title={
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                            <LightbulbIcon color="warning" />
                                            <Typography variant="h6">Hint #{hint.id}</Typography>
                                        </Box>
                                    }
                                    sx={{ borderBottom: "1px solid #ddd", textAlign: "center", }}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Box display="flex" justifyContent="center" gap={1} mb={1}>
                                        {hint.numbers.map((num: number, idx: number) => (
                                            <TextField
                                                key={idx}
                                                value={num}
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ readOnly: true, style: { textAlign: "center" } }}
                                                sx={{ width: 60 }}
                                            />
                                        ))}
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {hint.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/* <!-- Hints ends --> */}
                {/* Result Message */}
                {message && (
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ mt: 3, color: message.includes("🎉") ? "green" : "red" }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Box >
    );
}
export default CrackTheCode;