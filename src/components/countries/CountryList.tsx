import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';


//just testing accesability of the API
interface Country {
  name: {
    common: string;
  };
  region: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions,setRegions]=useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data: Country[] = response.data;
        const englishNames = data.filter((country: Country) => country.name.common);
        setCountries(englishNames);
        setRegions(Array.from(new Set(data.map((country: Country) => country.region))));   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
      }}
    >
    <Typography>Total number of regions: {regions.length}</Typography>
    <List>
    {regions.map((region, index) => (
        <ListItem key={index}>
          <ListItemText primary={region} />
        </ListItem>
      ))}
    </List>
    <List>
      {countries.map((country, index) => (
        <ListItem key={index}>
          <ListItemText primary={country.name.common} />
        </ListItem>
      ))}
    </List>
    </Stack>
  );
};

export default CountryList;
