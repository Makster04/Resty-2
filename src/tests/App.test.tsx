import '@testing-library/jest-dom'; // Provides Jest DOM matchers
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import nock from 'nock'; // Import nock for HTTP request mocking
import App from '../App'; // Import App component

describe('App Component Tests with Nock and History', () => {
  // Clean up nock after each test to avoid side effects
  afterEach(() => {
    nock.cleanAll(); // Ensure all mocked endpoints are cleared
  });

  it('should render data after form submission and add to history', async () => {
    const mockUrl = 'https://pokeapi.co/api/v2/pokemon/ditto'; // URL to be mocked

    // Corrected mock response for the API call
    const mockResponse = {
      id: 132,
      name: 'ditto',
      abilities: [
        { ability: { name: 'limber' }, is_hidden: false },
        { ability: { name: 'imposter' }, is_hidden: true },
      ],
      base_experience: 101,
      height: 3,
      weight: 40,
    };

    // Use nock to mock the HTTP request to the given URL
    nock('https://pokeapi.co')
      .get('/api/v2/pokemon/ditto') // Define the correct endpoint to mock
      .reply(200, mockResponse); // Return the mock response with status 200

    // Render the App component for testing
    render(<App />);

    // Find the input field and submit button
    const input = screen.getByLabelText(/url/i); // Get the URL input field
    const submitButton = screen.getByText(/go!/i); // Get the submit button

    // Simulate form submission with the mocked URL
    fireEvent.change(input, { target: { value: mockUrl } }); // Set the correct URL
    fireEvent.click(submitButton); // Simulate a click on the submit button

    // Wait for the expected data to be rendered
    await waitFor(() => {
      expect(screen.getByText(/ditto/i)).toBeInTheDocument(); // Check if "ditto" is rendered
      expect(screen.getByText(/limber/i)).toBeInTheDocument(); // Check if "limber" is rendered
      expect(screen.getByText(/imposter/i)).toBeInTheDocument(); // Check if "imposter" is rendered
    });

    // Check if the history is updated with the new API call
    expect(screen.getByText(/GET - https:\/\/pokeapi.co\/api\/v2\/pokemon\/ditto/i)).toBeInTheDocument(); // Check if history is updated
  });

  it('should render results when clicking on a history item', async () => {
    const mockUrl = 'https://pokeapi.co/api/v2/pokemon/ditto'; // URL to mock

    const mockResponse = {
      id: 132,
      name: 'ditto',
      abilities: [
        { ability: { name: 'limber' }, is_hidden: false },
        { ability: { name: 'imposter' }, is_hidden: true },
      ],
      base_experience: 101,
      height: 3,
      weight: 40,
    };

    // Use nock to mock the HTTP request
    nock('https://pokeapi.co')
      .get('/api/v2/pokemon/ditto') // Correct endpoint to mock
      .reply(200, mockResponse); // Return the correct response

    // Render the App component
    render(<App />);

    const input = screen.getByLabelText(/url/i); // Find the URL input field
    const submitButton = screen.getByText(/go!/i); // Find the submit button

    // Simulate form submission with the mocked URL
    fireEvent.change(input, { target: { value: mockUrl } }); // Change the URL input
    fireEvent.click(submitButton); // Simulate form submission

    // Wait for the expected data to be rendered
    await waitFor(() => {
      expect(screen.getByText(/ditto/i)).toBeInTheDocument(); // Check if "ditto" is rendered
    });

    // Click on the history item to simulate user interaction
    const historyItem = screen.getByText(/GET - https:\/\/pokeapi.co\/api\/v2\/pokemon\/ditto/i); // Get the history item
    fireEvent.click(historyItem); // Simulate a click on the history item

    // Check if the result is displayed after clicking on a history item
    await waitFor(() => {
      expect(screen.getByText(/limber/i)).toBeInTheDocument(); // Ensure "limber" is rendered after clicking on history
    });
  });
});