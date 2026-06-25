/**
 * Modal dialog for adding a new employee to the database.
 * 
 * Provides a form with fields for employee information including:
 * - Personal details (first name, last name, date of birth)
 * - Contact information (email, phone number, address)
 * - Profile image URL
 * 
 * Automatically calculates employee age based on date of birth.
 * Validates required fields before submission and generates a unique ID for new employees.
 * 
 * @component
 * @example
 * const [open, setOpen] = useState(false);
 * 
 * <AddEmployeeModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onAdd={(employee) => console.log(employee)}
 * />
 * 
 * @param {Props} props - Component props
 * @param {boolean} props.open - Controls whether the modal dialog is visible
 * @param {() => void} props.onClose - Callback fired when the modal is closed
 * @param {(employee: emplayeeDataType) => void} props.onAdd - Callback fired when a new employee is added
 * @returns {React.ReactElement} A Material-UI Dialog component containing the employee form
 */
import React, { useState } from "react";
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { emplayeeDataType } from "./data";
import { uniqueId } from "lodash";

interface Props {
    open: boolean;
    onClose: () => void;
    onAdd: (employee: emplayeeDataType) => void;
}

const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
    dob: "",
    imageUrl: "",
};

export default function AddEmployeeModal({ open, onClose, onAdd, }: Props) {
    const [form, setForm] = useState(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasBirthdayPassed = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        if (!hasBirthdayPassed) age--;
        return age;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.firstName || !form.lastName || !form.email || !form.dob) return;
        const newEmployee: emplayeeDataType = {
            id: uniqueId(), // ✅ safer than incrementing numbers
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            address: form.address.trim(),
            contactNumber: form.contactNumber.trim(),
            dob: form.dob,
            age: calculateAge(form.dob),
            imageUrl: form.imageUrl || "gfg.png",
        };

        onAdd(newEmployee);
        setForm(initialFormState);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Employee</DialogTitle>

            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent sx={{ display: "grid", gap: 2 }}>
                    <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required autoFocus />
                    <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
                    <TextField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
                    <TextField label="Address" name="address" value={form.address} onChange={handleChange} />
                    <TextField label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                        inputProps={{ max: `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`, }}
                    />
                    <TextField label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained">Add Employee</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
