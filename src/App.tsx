// App.tsx

import React, { useState, useReducer } from 'react'; // Add useReducer import
import './App.scss';

// Import existing components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form/Form';
import Results from './Components/Results';
import History from './assets/History/History'; // Import History component

// Define the shape of the state
interface State {
  loading: boolean;
  results: any | null; // Update the type based on your API response structure
  history: { method: string; url: string; results: any }[]; // Track history of API calls
}

// Define the different actions that can be dispatched to update the state
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'ADD_TO_HISTORY'; payload: { method: string; url: string; results: any } }; // Action to add to history

// Define the initial state
const initialState: State = {
  loading: false,
  results: null,
  history: [],
};

// Define the reducer function to handle state updates
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, results: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [...state.history, action.payload] }; // Add the API call to history
    default:
      return state;
  }
};

const App: React.FC = () => {
  // Initialize state using useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize state for handling API call without useReducer
  const [requestParams, setRequestParams] = useState<{ method: string; url: string }>({ method: '', url: '' });
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle API call without useReducer
  const callApi = (formData: { method: string; url: string }) => {
    setIsLoading(true);

    const mockData = {
      results: [
        { name: 'fake thing 1', url: 'http://fakethings.com/1' },
        { name: 'fake thing 2', url: 'http://fakethings.com/2' },
      ],
    };

    setTimeout(() => {
      setData(mockData);
      setRequestParams(formData);
      setIsLoading(false);
    }, 1000);
  };

  // Function to handle API call using useReducer
  const handleAPICall = async (method: string, url: string) => {
    dispatch({ type: 'FETCH_START' }); // Dispatch action to start loading
    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data }); // Dispatch action with fetched data
      dispatch({ type: 'ADD_TO_HISTORY', payload: { method, url, results: data } }); // Dispatch action to add to history
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Header />
      {/* Render existing components */}
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} isLoading={isLoading} />
      {/* Render History component with history from useReducer state */}
      <History history={state.history} />
      <Footer />
    </>
  );
};

export default App;
