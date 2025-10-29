import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid"
const Calculator = () => {
    const [display, setDisplay] = useState("");
    const [result, setResult] = useState("");
    const theme = useTheme();
    const primary = theme.palette.primary;
    const secondary = theme.palette.secondary;
    const grey = theme.palette.grey;
    const handleClick = (value: string) => {
        if (result !== "") handleClear();
        setDisplay((prev) => prev + value);
    };

    const handleClear = () => {
        setDisplay("");
        setResult("");
    };

    const handleCalculate = () => {
        try {
            // Safely evaluate using Function instead of eval Replace × and ÷ with * and /
            const sanitized = display.replace(/×/g, "*").replace(/÷/g, "/");
            const calculated = new Function(`return ${sanitized}`)();
            setResult(calculated.toString());
        } catch (err) { console.log(err); setResult("Error"); }
    };

    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, width: '100%', height: '730', borderRadius: 3, bgcolor: "background.paper", alignContent: 'center', justifyContent: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2, textAlign: "center" }}> Calculator </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={result ? result : display}
                    placeholder="0"
                    sx={{ mb: 1, "& .MuiInputBase-input": { textAlign: "right", fontSize: "2rem" } }}
                    slotProps={{ input: { readOnly: true, }, }}
                />
                <Grid container spacing={1}>
                    {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map(
                        (item) => (
                            <Grid size={{ xs: 3 }} key={item}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => item === "=" ? handleCalculate() : handleClick(item)}
                                    sx={{
                                        height: 70,
                                        fontSize: "2rem",
                                        fontWeight: 'bold',
                                        backgroundColor: item === "=" ? primary.main + " !important" : ["÷", "×", "-", "+"].includes(item) ? secondary.main + " !important" : grey[700] + " !important",
                                        color: "white",
                                        "&:hover": { backgroundColor: item === "=" ? primary.dark + " !important" : ["÷", "×", "-", "+"].includes(item) ? secondary.dark + " !important" : grey[800] + " !important" }
                                    }}
                                >
                                    {item}
                                </Button>
                            </Grid>
                        )
                    )}
                    <Grid size={{ xs: 12 }}>
                        <Button variant="outlined" color="error" fullWidth onClick={handleClear} sx={{ height: 70, fontSize: "2rem", }}>Clear</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    );
};

export default Calculator;