import { render, screen } from '@testing-library/react';
import { CountrySearch } from './CountrySearch';

const mockOnChange = jest.fn();

describe('CountrySearch component', () => {
  it('should render without errors', () => {
    // Mock sortedRegions data
    const sortedRegions = ['Region1', 'Region2', 'Region3'];

    // Render the CountrySearch component with mock props
    const { getByLabelText, getByText } = render(
      <CountrySearch
        onChange={mockOnChange}
        setExpandedState={jest.fn()} // Mock setExpandedState
        sortedRegions={sortedRegions}
      />
    );

    // Example test: Check if the input field is rendered
    const inputElement = getByLabelText('Search');
    expect(inputElement).toBeInTheDocument();
  });

});

