import { Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

export const Count = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };
  const Clear=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();  //when you click on cross it stops the onClick from happening
    setCount(0);
  }
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        height: '100px',
        width: '300px',
      }}
    >
      <Typography variant="h6">Count clicks: </Typography>
      <Button variant="contained" 
        sx={{paddingRight: '0px'}} 
        onClick={onClick}
        title="Click to count" // Tooltip text for  hover
        >
        {count} clicks
        <InputAdornment position="end">
           <IconButton 
           sx={{color:'white'}} 
           onClick={Clear}             
           title="Clear" // Tooltip text for icon hover
           >
             <ClearIcon />
           </IconButton>
         </InputAdornment>
      </Button>
    </Stack>
  );
};
