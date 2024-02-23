import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import ClearIcon from '@mui/icons-material/Clear';

interface CountrySearchProps {
  onChange?: (searchInput: string) => void;
  setExpandedState: React.Dispatch<React.SetStateAction<boolean[]>>;
  sortedRegions: string[];
}
export const CountrySearch = ({ onChange, setExpandedState, sortedRegions }: CountrySearchProps) => {
  const [input, setInput] = useState('');
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const userInput = e.target.value;
    onChange?.(e.target.value);
    setInput(userInput);
  };
  const Clear = () => {
    onChange?.('');
    setInput('');
    setExpandedState(Array(sortedRegions.length).fill(false));
  };

  return (
    <TextField
      variant="standard"
      onChange={handleChange}
      value={input}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearchSharpIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
              onClick={Clear}
              title="Clear" // Tooltip text for icon hover
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
