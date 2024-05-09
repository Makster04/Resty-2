import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component Tests', () => {
  it('should render resulting data in the output area after form submission', async () => {

    render(<App />);


    const input = screen.getByLabelText(/url/i);
    const submitButton = screen.getByText(/go!/i);


    fireEvent.change(input, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/fake thing 1/i)).toBeInTheDocument();
      expect(screen.getByText(/fake thing 2/i)).toBeInTheDocument();
    });
    // screen.debug();
  });
});
