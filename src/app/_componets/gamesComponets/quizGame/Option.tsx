
/**
 * Renders a radio group component for displaying and selecting quiz options.
 * 
 * @component
 * @example
 * const options = ['Option A', 'Option B', 'Option C'];
 * const [selected, setSelected] = useState('');
 * return (
 *   <Options 
 *     options={options} 
 *     selectedOption={selected} 
 *     onOptionChange={(e) => setSelected(e.target.value)} 
 *   />
 * );
 * 
 * @param {OptionsProps} props - The component props
 * @param {string[]} props.options - Array of option strings to display as radio choices
 * @param {string} props.selectedOption - The currently selected option value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onOptionChange - Callback function invoked when an option is selected
 * @returns {React.ReactElement} A Material-UI RadioGroup component with FormControlLabel items for each option
 */
import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
interface OptionsProps { options: string[]; selectedOption: string; onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }
const Options: React.FC<OptionsProps> = ({ options, selectedOption, onOptionChange }) => {
    return (
        <RadioGroup aria-labelledby="options-group-label" name="options-radio-buttons-group" value={selectedOption} onChange={onOptionChange}>
            {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                    checked={selectedOption === option}
                    onChange={() => onOptionChange}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '20px', }, }}
                />
            ))}
        </RadioGroup >
    );
}

export default Options;