import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Link, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { alphabetical } from 'radash';

interface Country {
  name: {
    common: string;
  };
  region: string;
  flags: {
    png: string;
  };
  maps: {
    googleMaps: string;
  };
}

export const CountryList: React.FC = () => {
  const [data, setData] = useState<Country[]>([]);
  const ACCORDION_HEIGHT = 200;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data: Country[] = response.data;
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const countries = data.filter((country: Country) => country.name.common);
  const allRegions = Array.from(new Set(data.map((country: Country) => country.region)));
  const sortedRegions = alphabetical(allRegions, (r) => r);
  const groupedCountries = (region: string) => {
    const counrties = countries.filter((country: Country) => country.region === region);
    return alphabetical(counrties, (c) => c.name.common);
  }

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '380px',
      }}
    >
      <Typography variant='button'>Data from a public API (Countries)</Typography>

      {sortedRegions.map((region, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              {region}  <Typography variant="caption">/{groupedCountries(region).length}</Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ maxHeight: ACCORDION_HEIGHT, overflow: 'auto' }}>
              {groupedCountries(region).map((country, i) => (
                <ListItem key={i}>
                  <img
                    src={country.flags.png}
                    alt="Description"
                    style={{ width: 33, border: '1px solid lightgrey', marginRight: 10 }} />
                  <Link href={country.maps.googleMaps} target="_blank" underline="hover" color="inherit">
                    <ListItemText primary={country.name.common} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>

        </Accordion>
      ))}
    </Stack>
  );
};

