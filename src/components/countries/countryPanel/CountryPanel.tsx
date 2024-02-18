import { useEffect, useState } from "react";
import { CountryList } from "../countryList/CountryList"
import axios from "axios";
import { Country } from "../interface";
import { alphabetical } from "radash";
import { CountrySearch } from "../countrySearch/CountrySearch";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";


export const CountryPanel = () => {
    const [data, setData] = useState<Country[]>([]);
    const [search, setSearch] = useState('')

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

    const filteredCountries = search ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()),) : countries;

    const allRegions = Array.from(new Set(data.map((country: Country) => country.region)));
    const sortedRegions = alphabetical(allRegions, (r) => r);

    const groupedCountries = (region: string) => {
        const counrties = filteredCountries.filter((country: Country) => country.region === region);
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
            }}>
            <Typography variant='button'>Data from a public API (Countries)</Typography>

            <CountrySearch onChange={setSearch} />
            <CountryList sortedRegions={sortedRegions} groupedCountries={groupedCountries} />
        </Stack>
    )
}