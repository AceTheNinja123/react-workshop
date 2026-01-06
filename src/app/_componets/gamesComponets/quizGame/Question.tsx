
/**
 * Renders a quiz question with multiple choice options and a submit button.
 * 
 * @component
 * @example
 * const question = { id: 1, question: "What is 2+2?", options: ["3", "4", "5"], answer: "4" };
 * <Question 
 *   question={question}
 *   selectedOption="4"
 *   onOptionChange={handleOptionChange}
 *   onSubmit={handleSubmit}
 * />
 * 
 * @param {QuestionProps} props - The component props
 * @param {qBankType} props.question - The question object containing id, question text, options, and correct answer
 * @param {string} props.selectedOption - The currently selected option value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onOptionChange - Callback fired when an option is selected
 * @param {(e: React.FormEvent<HTMLFormElement>) => void} props.onSubmit - Callback fired when the form is submitted
 * 
 * @returns {React.ReactElement} A centered box containing the question title, question text, options, and submit button
 */
import React from 'react';
import { Box, FormControl, Typography, Button } from "@mui/material";
import Options from "./Option";

interface qBankType { id: number; question: string; options: string[]; answer: string; }
interface QuestionProps { question: qBankType; selectedOption: string; onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; }

const Question: React.FC<QuestionProps> = ({ question, selectedOption, onOptionChange, onSubmit }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2'>Question {question.id}</Typography>
            <Typography variant='h4'>{question.question}</Typography>
            <form onSubmit={onSubmit}>
                <FormControl sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Options
                        options={question.options}
                        selectedOption={selectedOption}
                        onOptionChange={onOptionChange}
                    />
                    <Button type="submit" onClick={() => onSubmit} color='primary' variant='contained' sx={{ marginTop: 2 }}>SUBMIT</Button>
                </FormControl>
            </form>
        </Box >
    );
}
export default Question;