import React, { useState } from 'react';

import './Form.scss';

interface FormProps {
  handleApiCall: (formData: {
    method: string;
    url: string
  }) => void;
}

const Form: React.FunctionComponent<FormProps> = ({ handleApiCall }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleApiCall({ method, url });
  };

    return (
      <>
        <form onSubmit={handleSubmit}>
      <label>
        <span>URL: </span>
        <input
          name="url" 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">GO!</button>
      </label>
      <label className="methods">
        <input
          type="radio" 
          id="get" 
          name="method" 
          value="GET" 
          checked={method === 'GET'}
          onChange={() => setMethod('GET')}
        /> GET
        <input
          type="radio" 
          id="post" 
          name="method" 
          value="POST" 
          checked={method === 'POST'} 
          onChange={() => setMethod('POST')} 
        /> POST
        <input
          type="radio" 
          id="put" 
          name="method" 
          value="PUT" 
          checked={method === 'PUT'} 
          onChange={() => setMethod('PUT')} 
        /> PUT
        <input
          type="radio" 
          id="patch" 
          name="method" 
          value="PATCH" 
          checked={method === 'PATCH'} 
          onChange={() => setMethod('PATCH')} 
        /> PATCH
        <input
          type="radio" 
          id="delete" 
          name="method" 
          value="DELETE" 
          checked={method === 'DELETE'} 
          onChange={() => setMethod('DELETE')} 
        /> DELETE
      </label>
      {['POST', 'PUT'].includes(method) && (
        <div>
          <label>
            <span>Request Body: </span>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
            />
          </label>
        </div>
      )}
    </form>
      </>
    );
}

export default Form;
