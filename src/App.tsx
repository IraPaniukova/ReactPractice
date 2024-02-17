import { Stack, Typography } from '@mui/material';
import './App.css';
import { Count } from './components/count/Count';
import { CountryList } from './components/countries/CountryList';

function App() {
  return (
    <>
      <Typography variant='h3' mx={2} align='center' >React Components</Typography>
      <Stack  ml={5} direction="row" spacing={2}>
        <Stack>
          <Count />
        </Stack>
        <Stack >
          <CountryList/>
        </Stack>
      </Stack>
    </>
  )
}
export default App;
