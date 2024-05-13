import React from 'react';
import './History.scss';
 

interface HistoryProps {
  history: Array<{ method: string; url: string; data: any }>;
  onClick: (item: any) => void;
}

const History: React.FC<HistoryProps> = ({ history, onClick }) => {
  return (
    <section className="history">
      <h2>API Call History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onClick(item)}>
            {item.method.toUpperCase()} - {item.url}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default History;