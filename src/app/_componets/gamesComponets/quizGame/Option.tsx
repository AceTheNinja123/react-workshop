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