// History.tsx

import React from 'react';

// Define the shape of a single history entry
interface HistoryEntry {
  method: string;
  url: string;
  results: any; // Update the type based on your API response structure
}

// Define props for the History component
interface Props {
  history: HistoryEntry[]; // History array containing multiple HistoryEntry objects
}

const History: React.FC<Props> = ({ history }) => {
  // Function to handle click on a history entry
  const handleHistoryClick = (entry: HistoryEntry) => {
    // Implement logic to handle history click
    // This could involve displaying the results of the clicked entry in the Results component
  };

  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {/* Map through history array and render a button for each history entry */}
        {history.map((entry, index) => (
          <li key={index}>
            <button onClick={() => handleHistoryClick(entry)}>{entry.url}</button> {/* Pass entry to handleHistoryClick function */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
