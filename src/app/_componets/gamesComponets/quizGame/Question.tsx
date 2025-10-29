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