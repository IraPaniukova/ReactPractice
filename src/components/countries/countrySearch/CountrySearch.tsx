import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';

interface CountrySearchProps {
    onChange?: (searchInput: string) => void;
}
export const CountrySearch = ({ onChange }: CountrySearchProps) => {
    const [input, setInput] = useState('');
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const userInput = e.target.value;
        onChange?.(e.target.value);
        setInput(userInput);
    };

    return (
        <TextField
            variant="standard"
            onChange={handleChange}
            value={input} 
            InputProps={{
                startAdornment: <InputAdornment position="start"><ManageSearchSharpIcon/></InputAdornment>,
            }}/>
    )
}