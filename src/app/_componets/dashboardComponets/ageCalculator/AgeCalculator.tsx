/**
 * AgeCalculator component
 * 
 * A client-side React component that calculates a person's age based on their date of birth
 * and a specified current date. The component provides an interactive UI with date input fields
 * and displays the calculated age.
 * 
 * @component
 * @returns {React.ReactElement} A Box container with typography, text fields for date input,
 *                               a calculate button, and conditional age display
 * 
 * @example
 * ```tsx
 * <AgeCalculator />
 * ```
 * 
 * @remarks
 * - Uses Material-UI (MUI) components for styling and layout
 * - Supports dark and light theme modes
 * - Validates that both date fields are filled before calculation
 * - Accounts for whether the birthday has occurred in the current year
 * - Default date of birth is set to "2000-01-01"
 * 
 * @note
 * There is a bug in the current implementation: both TextField components are bound to the
 * `currentDate` state variable instead of separate `dob` and `currentDate` variables.
 * The first TextField should be bound to `dob` state and update `setDob`.
 */
"use client";
import React, { useState } from "react";
import { Box, Button, Typography, TextField, useTheme, InputAdornment } from "@mui/material";
import { IconCalendar } from "@tabler/icons-react";

const AgeCalculator = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const [dob, setDob] = useState("2000-01-01");
    const [currentDate, setCurrentDate] = useState("");
    const [age, setAge] = useState<number | null>(null);

    const handleCalculate = () => {
        if (!dob || !currentDate) {
            alert("Please enter both Date of Birth and Current Date.");
            setDob("2000-01-01")
            return;
        }

        const dobDate = new Date(dob);
        const current = new Date(currentDate);

        let calculatedAge = current.getFullYear() - dobDate.getFullYear();
        const monthDiff = current.getMonth() - dobDate.getMonth();

        // Adjust for not-yet-had-birthday this year
        if (monthDiff < 0 || (monthDiff === 0 && current.getDate() < dobDate.getDate())) { calculatedAge--; }

        setAge(calculatedAge);
    };

    return (
        <Box sx={{ width: '60%', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>AGE CALCULATOR</Typography>
            {/* Date Of Birth */}
            <Typography variant="h4" sx={{ textAlign: "left", fontWeight: "bold", mt: 2 }}>Enter your Date of Birth</Typography>
            <TextField
                fullWidth
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                placeholder="Select a date"
                slotProps={{ input: { endAdornment: (<InputAdornment position="end"><IconCalendar style={{ color: mode === "dark" ? "#fff" : "#000", }} /></InputAdornment>), }, }}
                sx={{ mt: 1, fontSize: "1.2rem", "& input[type='date']::-webkit-calendar-picker-indicator": { display: "none", WebkitAppearance: "none", }, }}
            />
            {/* Current Date */}
            <Typography variant="h4" sx={{ textAlign: "left", fontWeight: "bold", mt: 3 }}>Current Date</Typography>
            <TextField
                fullWidth
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                placeholder="Select a date"
                slotProps={{ input: { endAdornment: (<InputAdornment position="end"><IconCalendar style={{ color: mode === "dark" ? "#fff" : "#000", }} /></InputAdornment>), }, }}
                sx={{ mt: 1, fontSize: "1.2rem", "& input[type='date']::-webkit-calendar-picker-indicator": { display: "none", WebkitAppearance: "none", }, }}
            />
            {/* Calculate Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, bgcolor: theme.palette.primary.main, "&:hover": { bgcolor: theme.palette.primary.dark + '!important' }, fontWeight: "bold", fontSize: "1.2rem", }}
                onClick={handleCalculate}
            >
                Calculate
            </Button>
            {/* Show of Age */}
            {age !== null && (<Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: mode === "dark" ? "#fff" : "#000", }}>Your age is {age} years.</Typography>)}
        </Box>
    );
};
export default AgeCalculator;