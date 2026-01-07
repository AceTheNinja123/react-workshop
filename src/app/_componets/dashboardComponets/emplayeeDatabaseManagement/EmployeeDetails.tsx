
/**
 * EmployeeDetails component displays detailed information about a selected employee.
 * 
 * @component
 * @example
 * const employee = { firstName: "John", lastName: "Doe", age: 30, address: "123 Main St", email: "john@example.com", contactNumber: "555-1234", dob: "1993-01-15", imageUrl: "profile.jpg" };
 * return <EmployeeDetails employee={employee} />
 * 
 * @param {Props} props - The component props
 * @param {emplayeeDataType | null} props.employee - The employee object to display, or null if no employee is selected
 * @returns {React.ReactElement} A box containing the employee's profile image and information, or a message to select an employee
 */
import { emplayeeDataType } from "./data";
import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import Image from "next/image";
interface Props {
    employee: emplayeeDataType | null;
}

const EmployeeDetails: React.FC<Props> = ({ employee }) => {
    if (!employee) return <Box>Select an employee</Box>;
    return (
        <Box className="employees__names--list" sx={{ height: '100%', width: "100%", margin: '10px', textAlign: 'center', boxSizing: 'border-box' }}>
            <Typography variant="h4" sx={{ my: 1 }}>Employee Information</Typography>
            <Divider sx={{ border: 1, borderColor: "inherit", my: 1 }} flexItem />
            <Box className="employees__single--info" sx={{ height: '100%', width: "100%", marginTop: '20px', boxSizing: 'border-box' }}>
                <Image width={150} height={150} alt={`${employee.firstName} ${employee.lastName}`} src={`/images/emplayeeProfiles/${employee.imageUrl}`} />
                {/* <img src={employee.imageUrl} /> */}
                <Typography className="employees__single--heading" sx={{ textAlign: "center", fontSize: 25, textTransform: "uppercase", padding: 5, }}>{employee.firstName} {employee.lastName} ({employee.age})</Typography>
                <Typography variant="h5">{employee.address}</Typography>
                <Typography variant="h5">{employee.email}</Typography>
                <Typography variant="h5">Mobile - {employee.contactNumber}</Typography>
                <Typography variant="h5">DOB - {employee.dob}</Typography>
            </Box>
        </Box>
    );
};
export default EmployeeDetails;