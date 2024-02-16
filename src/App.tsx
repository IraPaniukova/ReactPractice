import { Stack, Typography } from '@mui/material';
import './App.css';
import { Count } from './components/count/Count';

function App() {
  return (
    <>
    <Typography variant='h3' mx={2} align='center' >React Components</Typography>
    <Stack ml={5}>
      <Count />
    </Stack>
    </>
  );
}

export default App;
