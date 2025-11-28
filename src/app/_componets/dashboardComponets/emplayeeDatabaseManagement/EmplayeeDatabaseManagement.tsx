//EmplayeeDatabaseManagement
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Input, styled, useTheme, Button, Select, MenuItem, InputAdornment, TextField, IconButton, } from "@mui/material";
import { emplayeeData, emplayeeDataType } from "./data";
import "./EmplayeeDatabaseManagement.css";
/* Taken inspiration from this: https://www.geeksforgeeks.org/javascript/employee-database-management-system-using-html-css-and-jav*/
const StyledTextField = styled(TextField)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid rgb(236, 236, 236)",
    "&:-webkit-outer-spin-button": { "-webkit-appearance": "none", margin: 0, },
    "&:-webkit-inner-spin-button": { "-webkit-appearance": "none", margin: 0, },
}));
// --- Component ---
const EmplayeeDatabaseManagement = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    // const [addEmployee, setAddEmployee] = useState({
    //     firstName: "",
    //     lastName: "",
    //     imageUrl: "",
    //     email: "",
    //     contactNumber: null,
    //     salary: 0,
    //     address: "",
    //     dob: "",
    // });
    // const [employees, setEmployees] = useState<emplayeeDataType[]>(emplayeeData)
    // // Keep track of selected employee
    // const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(employees[0].id)
    // const [selectedEmployee, setSelectedEmployee] = useState<emplayeeDataType>(employees[0])

    // // DOM elements for employee list and employee details
    // const employeeList = document.querySelector(".employees__names--list");
    // const employeeInfo = document.querySelector(".employees__single--info");

    // // ---------------- Add Employee Logic ----------------
    // const createEmployee = document.querySelector(".createEmployee");
    // const addEmployeeModal = document.querySelector(".addEmployee");
    // const addEmployeeForm = document.querySelector(".addEmployee_create");

    // // Show add employee modal
    // createEmployee?.addEventListener("click", () => {
    //     addEmployeeModal?.style.display = "flex";
    // });

    // // Close modal when clicking outside form
    // addEmployeeModal?.addEventListener("click", (e) => {
    //     if (e.target.className === "addEmployee") {
    //         addEmployeeModal.style.display = "none";
    //     }
    // });

    // // Restrict DOB input → Minimum 18 years old
    // const dobInput = document.querySelector(".addEmployee_create--dob");
    // dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

    // // Handle add employee form submit
    // addEmployeeForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     // Collect form data
    //     const formData = new FormData(addEmployeeForm);
    //     const values = [...formData.entries()];
    //     let empData = {};
    //     values.forEach((val) => {
    //         empData[val[0]] = val[1];
    //     });

    //     // Generate new employee data
    //     empData.id = employees[employees.length - 1].id + 1;
    //     empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    //     empData.imageUrl = empData.imageUrl || "gfg.png";

    //     // Push into local employees array (NOT saved to file)
    //     employees.push(empData);

    //     // Re-render employee list
    //     renderEmployees();

    //     // Reset form + close modal
    //     addEmployeeForm.reset();
    //     addEmployeeModal.style.display = "none";
    // });
    // // ----------------------------------------------------

    // // ---------------- Select & Delete Employee Logic ----------------
    // employeeList.addEventListener("click", (e) => {
    //     // Select employee
    //     if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
    //         selectedEmployeeId = e.target.id;
    //         renderEmployees();
    //         renderSingleEmployee();
    //     }

    //     // Delete employee
    //     if (e.target.tagName === "I") {
    //         employees = employees.filter((emp) => String(emp.id) !== e.target.parentNode.id);

    //         // If deleted employee was selected, update selection
    //         if (String(selectedEmployeeId) === e.target.parentNode.id) {
    //             selectedEmployeeId = employees[0]?.id || -1;
    //             selectedEmployee = employees[0] || {};
    //             renderSingleEmployee();
    //         }

    //         renderEmployees();
    //     }
    // });
    // // ----------------------------------------------------------------

    // // ---------------- Render All Employees ----------------
    // const renderEmployees = () => {
    //     employeeList.innerHTML = "";
    //     employees.forEach((emp) => {
    //         const employee = document.createElement("span");
    //         employee.classList.add("employees__names--item");

    //         // Highlight selected employee
    //         if (parseInt(selectedEmployeeId, 10) === emp.id) {
    //             employee.classList.add("selected");
    //             selectedEmployee = emp;
    //         }

    //         // Render employee name with delete button
    //         employee.setAttribute("id", emp.id);
    //         employee.innerHTML = `${emp.firstName} ${emp.lastName} 
    //             <i class="employeeDelete">&#10060;</i>`;
    //         employeeList.append(employee);
    //     });
    // };

    // ---------------- Render Single Employee ----------------
    // const renderSingleEmployee = () => {
    //     // No employee selected
    //     if (selectedEmployeeId === -1) {
    //         employeeInfo.innerHTML = "";
    //         return;
    //     }

    //     // Render selected employee details
    //     employeeInfo.innerHTML = `
    //     <img src="${selectedEmployee.imageUrl}" />
    //     <span class="employees__single--heading">
    //     ${selectedEmployee.firstName} ${selectedEmployee.lastName} 
    //         (${selectedEmployee.age})
    //     </span>
    //     <span>${selectedEmployee.address}</span>
    //     <span>${selectedEmployee.email}</span>
    //     <span>Mobile - ${selectedEmployee.contactNumber}</span>
    //     <span>DOB - ${selectedEmployee.dob}</span>
    //   `;
    // };

    // Initial render
    // renderEmployees();
    // if (selectedEmployee) renderSingleEmployee();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // ⛔️ Prevent hydration mismatch before mount
    if (!mounted) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                <Typography variant="h1">Employee Database Management</Typography>
                <Button sx={{ padding: "10px 15px", borderRadius: "20px", border: "none", backgroundColor: "var(--btn)", cursor: "pointer", "&:hover": { backgroundColor: `var(--btn-hover)` }, }}>
                    Add Employee
                </Button>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ border: "1px solid black", overflowY: "scroll", height: "450px", width: "30%", padding: "10px", display: "flex", flexDirection: "column", }}>
                    <Typography variant="h1" sx={{ paddingBottom: "10px", marginBottom: "5px", textAlign: "center", borderBottom: "1px solid black", }}>Employee List</Typography>
                    <Box id="employees__names--list"></Box>
                </Box>
                <Box sx={{ border: "1px solid black", overflowY: "scroll", height: "450px", width: "70%", padding: "10px", display: "flex", flexDirection: "column", }}>
                    <Typography variant="h1" sx={{ paddingBottom: "10px", marginBottom: "5px", textAlign: "center", borderBottom: "1px solid black", }}>Employee Information</Typography>
                    <Box id="employees__single--info"></Box>
                </Box>
            </Box>
            {/* <!-- Add Employee Code - START --> */}
            <Box id="addEmployee" sx={{ display: "none", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, justifyContent: "center", alignItems: "center", backgroundColor: "var(--modal-bg)", }}>
                <Typography variant="h1" sx={{ mb: 4 }}>Add a new Employee</Typography>
                {/* FORM */}
                <form id="addEmployee_create" onSubmit={onSubmit} style={{ width: "400px", backgroundColor: "white", boxShadow: "0 0 50px grey", padding: "20px", borderRadius: "5px", textAlign: "center", display: "flex", flexDirection: "column", gap: "15px", }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "48.1% 48.1%", columnGap: "15px", }}>
                        <StyledTextField
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                        //nChange={(e) => setExpensesName(e.target.value)}
                        />
                        <StyledTextField
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                        //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                        />
                    </Box>
                    <StyledTextField
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL (Optional)"
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="number"
                        name="contactNumber"
                        placeholder="Contact"
                        required
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        required
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="date" name="dob"
                        placeholder="Date of Birth"
                        className="addEmployee_create--dob"
                        required
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                    <StyledTextField
                        type="submit"
                        className="addEmployee_create--submit"
                        value="Submit"
                    //onChange={(e) => setExpensesAmount(Number(e.target.value))}
                    />
                </form>
            </Box>
        </Box >
    );
};
export default EmplayeeDatabaseManagement;