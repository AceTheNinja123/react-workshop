import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid"
const Calculator = () => {
    const [display, setDisplay] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value: string) => {
        if(result !== "") handleClear(); 
        setDisplay((prev) => prev + value); };

    const handleClear = () => {
        setDisplay("");
        setResult("");
    };

    const handleCalculate = () => {
        try {
            // Safely evaluate using Function instead of eval
            // Replace × and ÷ with * and /
            const sanitized = display.replace(/×/g, "*").replace(/÷/g, "/");
            const calculated = new Function(`return ${sanitized}`)();
            setResult(calculated.toString());
        } catch (err) {console.log(err); setResult("Error"); }
    };

    return (
        <Box sx={{ display: 'flex', height: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, width: 300, borderRadius: 3, bgcolor: "background.paper" }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}> Calculator </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={result ? result : display}
                    placeholder="0"
                    sx={{ mb: 1, "& .MuiInputBase-input": { textAlign: "right", fontSize: "1.5rem" } }}
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
                                        height: 56,
                                        fontSize: "1.2rem",
                                        bgcolor: item === "=" ? "success.main" : ["÷", "×", "-", "+"].includes(item) ? "primary.main" : "grey.700",
                                        color: "white",
                                        "&:hover": { bgcolor: item === "=" ? "success.dark" : ["÷", "×", "-", "+"].includes(item) ? "primary.dark" : "grey.800" }
                                    }}
                                >
                                    {item}
                                </Button>
                            </Grid>
                        )
                    )}
                    <Grid size={{ xs: 12 }}>
                        <Button variant="outlined" color="error" fullWidth onClick={handleClear} sx={{ height: 56 }}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    );
};

export default Calculator;
