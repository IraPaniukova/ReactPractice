import { render, screen } from '@testing-library/react';
import { Count } from './Count';
import userEvent from '@testing-library/user-event';


describe('Count component', () => {
    it.each `
     value
     ${'Count clicks:'}
     ${'0 clicks'}
      `  ( 'renders text', ({value}) => {
         render(<Count />);  
         expect(screen.getByText(value)).toBeVisible(); 
    });
    it('adds a number after clicking the main button and clears count after clicking the icon button x', ()=>{
        render(<Count />);
        const mainButton = screen.getByRole('button', { name: '0 clicks' });
        userEvent.click(mainButton);  
        expect(screen.getByText("1 clicks")).toBeVisible();
        const clearButton = screen.getByTestId('ClearIcon'); 
        userEvent.click(clearButton); 
        expect(screen.getByText("0 clicks")).toBeVisible();
      });
});

//just to remember:
// it.each`
//   value              | expectedText
//   ${'Count clicks:'} | ${'Count clicks:'}
//   ${'CLICKS'}        | ${'CLICKS'}
// `('renders $expectedText', ({ value, expectedText }) => {
//   render(<Count />);
//   expect(screen.getByText(value)).toBeVisible();
// });