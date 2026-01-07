
/**
 * Displays a list of employees with selection and deletion capabilities.
 * 
 * @component
 * @example
 * const employees = [{ id: '1', firstName: 'John', lastName: 'Doe' }];
 * <EmployeeList 
 *   employees={employees}
 *   selectedId="1"
 *   onSelect={(id) => console.log(id)}
 *   onDelete={(id) => console.log(id)}
 * />
 * 
 * @param {Object} props - The component props
 * @param {emplayeeDataType[]} props.employees - Array of employee objects to display
 * @param {string | null} props.selectedId - The ID of the currently selected employee
 * @param {(id: string) => void} props.onSelect - Callback function invoked when an employee is selected
 * @param {(id: string) => void} props.onDelete - Callback function invoked when an employee delete button is clicked
 * @returns {React.ReactElement} A scrollable list of employees with interactive selection and delete functionality
 */
import { emplayeeDataType } from "./data";
import { Box, Divider, IconButton, Typography, } from "@mui/material";

interface Props {
    employees: emplayeeDataType[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
}

const EmployeeList: React.FC<Props> = ({ employees, selectedId, onSelect, onDelete }) => (
    <Box className="employees__names--list" sx={{ height: '100%', width: "50%", margin: '10px', alignItems: 'center', justifyItems: 'center', boxSizing: 'border-box' }}>
        <Typography variant="h4" sx={{ my: 1 }}>Employee List</Typography>
        <Divider sx={{ border: 1, borderColor: "inherit", my: 1 }} flexItem />
        <Box sx={{ overflowY: 'auto', maxHeight: "85%" }}>
            {employees.map((emp) => (
                <Box key={emp.id} className={`employees__names--item ${emp.id === selectedId ? "selected" : ""}`} onClick={() => onSelect(emp.id)}                >
                    {emp.firstName} {emp.lastName}
                    <IconButton onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}>❌</IconButton>
                </Box>
            ))}
        </Box>
    </Box>
);
export default EmployeeList;