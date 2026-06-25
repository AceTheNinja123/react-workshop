/**
 * EmplayeeDatabaseManagement Component
 * 
 * A client-side React component that manages an employee database with functionality to view,
 * add, and delete employee records. Displays a list of employees with detailed information
 * and allows users to interact with the database through a modal interface.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <EmplayeeDatabaseManagement />
 * ```
 * 
 * @returns {JSX.Element} A Box container displaying the employee database management interface
 * with an employee list, details panel, and add employee modal.
 * 
 * @state {emplayeeDataType[]} employees - Array of employee objects currently in the database
 * @state {string | null} selectedEmployeeId - ID of the currently selected employee for viewing details
 * @state {boolean} isAddOpen - Controls visibility of the add employee modal
 * 
 * @see {@link EmployeeList} - Component for displaying the list of employees
 * @see {@link EmployeeDetails} - Component for displaying selected employee details
 * @see {@link AddEmployeeModal} - Modal component for adding new employees
 * @see {@link emplayeeData} - Initial employee data
 * 
 * @remarks
 * - Inspired by GeeksforGeeks employee database management system tutorial
 * - Uses Material-UI components for consistent styling
 * - Automatically clears selection when the selected employee is deleted
 */
"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { emplayeeData, emplayeeDataType } from "./data";
import "./EmplayeeDatabaseManagement.css";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import AddEmployeeModal from "./AddEmployeeModal";
/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/employee-database-management-system-using-html-css-and-javascript/*/
// --- Component ---
const EmplayeeDatabaseManagement = () => {
    const [employees, setEmployees] = useState<emplayeeDataType[]>(emplayeeData);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(emplayeeData[0]?.id ?? null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);

    const handleAddEmployee = (employee: emplayeeDataType) => {
        setEmployees((prev) => [...prev, employee]);
        setSelectedEmployeeId(employee.id);
    };

    const handleDeleteEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        if (id === selectedEmployeeId) { setSelectedEmployeeId(null); }
    };

    return (
        <Box sx={{ width: "100%", height: '740px', alignContent: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">Employee Database Management</Typography>
                <Button onClick={() => setIsAddOpen(true)}>Add Employee</Button>
            </Box>
            <Divider sx={{ marginTop: "10px", border: 1, borderColor: "inherit", my: 1 }} flexItem />
            <Box display="flex" sx={{ marginTop: "10px", height: '650px', border: 1, gap: 2, borderColor: "inherit", boxSizing: 'border-box' }}>
                <EmployeeList employees={employees} selectedId={selectedEmployeeId} onSelect={setSelectedEmployeeId} onDelete={handleDeleteEmployee} />
                <Divider sx={{ direction: "column", border: 1, borderColor: "inherit", }} flexItem />
                {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
            </Box>
            <AddEmployeeModal open={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAddEmployee} />
        </Box>
    );
};

export default EmplayeeDatabaseManagement;