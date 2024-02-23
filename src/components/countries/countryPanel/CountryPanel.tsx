import { useEffect, useState } from 'react';
import { CountryList } from '../countryList/CountryList';
import axios from 'axios';
import { Country } from '../interface';
import { alphabetical } from 'radash';
import { CountrySearch } from '../countrySearch/CountrySearch';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

export const CountryPanel = () => {
  const [data, setData] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const SEARCH_STARTS_FROM = 2;

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

  const filteredCountries =
    search && search.length >= SEARCH_STARTS_FROM
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()),
        )
      : countries;

  const allRegions = Array.from(
    new Set(data.map((country: Country) => country.region)),
  );
  const sortedRegions = alphabetical(allRegions, (r) => r);

  const groupedCountries = (region: string) => {
    const counrties = filteredCountries.filter(
      (country: Country) => country.region === region,
    );
    return alphabetical(counrties, (c) => c.name.common);
  };
  
  const isExpanded = (region: string) => {
    if (
      search &&
      search.length >= SEARCH_STARTS_FROM &&
      groupedCountries(region).length > 0
    ) {
      return true;
    }
    return false;
  };

  const [expandedState, setExpandedState] = useState<boolean[]>(
    Array(sortedRegions.length).fill(false),
  );
  // Function to handle accordion toggle
  const accordionToggle = (index: number) => {
    setExpandedState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
      <Typography variant="button">
        Countries (Data from a public API)
      </Typography>
      <CountrySearch onChange={setSearch} setExpandedState={setExpandedState}  sortedRegions={sortedRegions}/> 
      <CountryList
        sortedRegions={sortedRegions}
        groupedCountries={groupedCountries}
        isExpanded={isExpanded}
        expandedState={expandedState}
        accordionToggle={accordionToggle}
      />
    </Stack>
  );
};
