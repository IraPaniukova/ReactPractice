import { Stack, Typography } from '@mui/material';
import './App.css';
import { Count } from './components/count/Count';
import { CountryPanel } from './components/countries/countryPanel/CountryPanel';

function App() {
  return (
    <>
      <Typography variant='h3' mx={2} align='center' sx={{overflowY: 'auto', paddingRight: '17px'}} >React Components</Typography>
      <Stack ml={5} direction="row" spacing={2}>
        <Stack>
          <Count />
        </Stack>
        <Stack >
          <CountryPanel/>
        </Stack>
      </Stack>
    </>
  )
}
export default App;
