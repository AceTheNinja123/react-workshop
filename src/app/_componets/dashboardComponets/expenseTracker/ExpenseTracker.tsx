"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Select, MenuItem, InputAdornment, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import { IconEdit, IconTrash, IconCalendar } from "@tabler/icons-react";
/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/build-an-expense-tracker-with-html-css-and-javascript/*/

interface expensesType {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
}

const ExpenseTracker = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // DATA
    const [expenses, setExpenses] = useState<expensesType[]>([]);
    const [filterCategory, setFilterCategory] = useState("All");

    // FORM STATE
    const [expenseName, setExpensesName] = useState("");
    const [expenseAmt, setExpensesAmount] = useState<number | "">("");
    const [expenseCategory, setExpensesCategory] = useState("Select Category");
    const [expenseDate, setExpensesDate] = useState("");

    // EDITING
    const [editId, setEditId] = useState<string | null>(null);

    // TOTAL
    const [totalAmount, setTotalAmount] = useState("0.00");

    const theme = useTheme();

    // Recalculate total whenever expenses change
    useEffect(() => {
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        setTotalAmount(total.toFixed(2));
    }, [expenses]);

    // RESET FORM
    const resetForm = () => {
        setExpensesName("");
        setExpensesAmount("");
        setExpensesCategory("Select Category");
        setExpensesDate("");
        setEditId(null); // stop edit mode
    };

    // SUBMIT
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Editing mode
        if (editId) {
            setExpenses((prev) => prev.map((exp) => exp.id === editId ? { ...exp, name: expenseName, amount: Number(expenseAmt), category: expenseCategory, date: expenseDate, } : exp));
            resetForm();
            return;
        }

        // Add new expense
        const newExpense: expensesType = {
            id: String(expenses.length + 1),
            name: expenseName,
            amount: Number(expenseAmt),
            category: expenseCategory,
            date: expenseDate,
        };

        setExpenses((prev) => [...prev, newExpense]);
        resetForm();
    };

    // DELETE
    const deleteExpense = (id: string) => { setExpenses((prev) => prev.filter((x) => x.id !== id)); };

    // EDIT — load values into form
    const editExpense = (id: string) => {
        const exp = expenses.find((e) => e.id === id);
        if (!exp) return;

        setEditId(id);
        setExpensesName(exp.name);
        setExpensesAmount(exp.amount);
        setExpensesCategory(exp.category);
        setExpensesDate(exp.date);
    };

    // FILTERED DATA
    const filteredExpenses = filterCategory === "All" ? expenses : expenses.filter((e) => e.category === filterCategory);
    if (!mounted) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid", borderColor: theme.palette.primary.main, py: 4, }}>
            <Typography variant="h1" sx={{ mb: 4 }}>Expense Tracker</Typography>
            {/* FORM */}
            <form onSubmit={onSubmit}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, }}>
                    <TextField
                        type="text"
                        value={expenseName}
                        placeholder="Expense Name"
                        required
                        onChange={(e) => setExpensesName(e.target.value)}
                        sx={{ width: 150 }}
                    />

                    <TextField
                        type="number"
                        value={expenseAmt}
                        placeholder="Amount"
                        required
                        onChange={(e) => setExpensesAmount(Number(e.target.value))}
                        sx={{ width: 150 }}
                    />

                    <Select value={expenseCategory} onChange={(e) => setExpensesCategory(e.target.value)} required sx={{ width: 150 }}>
                        <MenuItem value="Select Category" disabled>Select Category</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Transport">Transport</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>

                    <TextField
                        type="date"
                        required
                        value={expenseDate}
                        onChange={(e) => setExpensesDate(e.target.value)}
                        slotProps={{ input: { endAdornment: (<InputAdornment position="end"><IconCalendar /></InputAdornment>), }, }}
                        sx={{ width: 150, "& input[type='date']::-webkit-calendar-picker-indicator": { display: "none", }, }}
                    />

                    <Button type="submit" sx={{ width: editId ? 100 : 150 }}>{editId ? "Save Edit" : "Add Expense"}</Button>

                    {editId && (<Button color="warning" onClick={resetForm}>Cancel Edit</Button>)}
                </Box>
            </form>

            {/* FILTER */}
            <Box sx={{ width: "90%", mb: 2 }}>
                <Select fullWidth value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transport">Transport</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </Box>

            {/* TABLE */}
            <TableContainer component={Paper} sx={{ width: "90%", mb: 2, border: "2px solid" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Expense Name</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredExpenses.map((exp) => (
                            <TableRow key={exp.id}>
                                <TableCell>{exp.name}</TableCell>
                                <TableCell>R {exp.amount}</TableCell>
                                <TableCell>{exp.category}</TableCell>
                                <TableCell>{exp.date}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => editExpense(exp.id)}><IconEdit /></IconButton>
                                    <IconButton color="error" onClick={() => deleteExpense(exp.id)}><IconTrash /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filteredExpenses.length === 0 && (<TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}><Typography>No expenses found</Typography></TableCell></TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* TOTAL */}
            <Typography variant="h6"><strong>Total:</strong> R {totalAmount}</Typography>
        </Box>
    );
};
export default ExpenseTracker;