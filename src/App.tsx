import React, { useReducer, useEffect } from 'react';
import axios from 'axios'; // Importing axios for HTTP requests
import './App.scss'; // Import styles

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Form from './Components/Form/Form';
import Results from './Components/Results/Results';
import History from "./Components/History/History";


const initialState = {
  isLoading: false,
  data: null,
  error: null,
  history: [],
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case 'API_REQUEST':
      return { ...state, isLoading: true, error: null };

    case 'API_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        history: [...state.history, action.payload],
      };

    case 'API_FAILURE':
      return { ...state, isLoading: false, error: action.payload.error };

    case 'SHOW_HISTORY_RESULT':
      return { ...state, data: action.payload.data };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleApiCall = async (formData: { method: string; url: string }) => {
    dispatch({type: 'API_REQUEST'});

    try {
      const response = await axios({
        method: formData.method,
        url: formData.url,
      });

      dispatch({
        type: 'API_SUCCESS',
        payload: {
          data: response.data,
          method: formData.method,
          url: formData.url,
        },
      });
    } catch (error) {
      dispatch({
        type: 'API_FAILURE',
        payload: { error: error.message },
      });
    }
  };

  const handleHistoryClick = (historyItem: any) => {
    dispatch({
      type: 'SHOW_HISTORY_RESULT',
      payload: { data: historyItem.data },
    });
  };

  return (
    <>
      <Header />
      <Form handleApiCall={handleApiCall} />
      <History history={state.history} onClick={handleHistoryClick} />
      {state.isLoading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div>Error: {state.error}</div>
      ) : (
        <Results data={state.data} />
      )}
      <Footer />
    </>
  );
};

export default App;