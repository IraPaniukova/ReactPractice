import { Accordion, AccordionDetails, AccordionSummary, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Country } from '../interface';
// import { useState } from 'react';

interface CountryListProps {
  sortedRegions: string[];
  groupedCountries: (region: string) => Country[];
  isExpanded: (region: string) => boolean;
}
export const CountryList: React.FC<CountryListProps> = ({ 
  sortedRegions, groupedCountries,isExpanded}) => {
  const ACCORDION_HEIGHT = 200;
 
  return (
    <>
      {sortedRegions.map((region, index) => (      
        <Accordion key={index}
        expanded={isExpanded(region)} 
        >
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
    </>
  );
};

