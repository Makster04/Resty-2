import React, { useState } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';



const App = () => {
  const [requestParams,setRequestParams] = useState({ method: '', url: ''});
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <Header />
        <div>Request Method: {requestParams.method}</div> 
        <div>URL: {requestParams.url}</div> 
        <Form handleApiCall={callApi} />
        <Results data={data} isLoading={isLoading} />
        <Footer />
    </>
  );
};

export default App;
