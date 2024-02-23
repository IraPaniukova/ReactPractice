import {
  Accordion,
  AccordionDetails,
  AccordionSummaryProps,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Country } from '../interface';
import MuiAccordionSummary, {
} from '@mui/material/AccordionSummary';


interface CountryListProps {
  sortedRegions: string[];
  groupedCountries: (region: string) => Country[];
  isExpanded: (region: string) => boolean;
  expandedState: boolean[]; 
  accordionToggle: (index: number) => void; 
}
export const CountryList: React.FC<CountryListProps> = ({
  sortedRegions,
  groupedCountries,
  isExpanded,
  expandedState,
  accordionToggle
}) => {
  const ACCORDION_HEIGHT = 200;

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    // '& .MuiAccordionSummary-content': {
    //   height: '100px', 
    //   padding: theme.spacing(1), 
    // },
  }));

  return (
    <>
      {sortedRegions.map((region, index) => (
        <Accordion
          key={index}
          expanded={expandedState[index] || isExpanded(region)}
          onChange={() => accordionToggle(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              {region}{' '}
              <Typography variant="caption">
                /{groupedCountries(region).length}
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ maxHeight: ACCORDION_HEIGHT, overflow: 'auto' }}>
              {groupedCountries(region).map((country, i) => (
                <ListItem key={i}>
                  <img
                    src={country.flags.png}
                    alt="Description"
                    style={{
                      width: 33,
                      border: '1px solid lightgrey',
                      marginRight: 10,
                    }}
                  />
                  <Link
                    href={country.maps.googleMaps}
                    target="_blank"
                    underline="hover"
                    color="inherit"
                  >
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
