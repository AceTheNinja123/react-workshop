import React from "react";
import { Box } from "@mui/material";
import ExpenseTrackerFunction from "@/app/_componets/dashboardComponets/expenseTracker/ExpenseTracker";
const ExpenseTracker = () => {
    return (
        <Box sx={{ display: 'flex', height: '750px', maxHeight: '750px', overflowY: 'auto', overflowX: 'auto', alignContent: 'center', justifyContent: 'center' }}>
            <ExpenseTrackerFunction/>
        </Box >
    );
};

export default ExpenseTracker;