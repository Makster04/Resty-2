import React from 'react';
import { prettyPrintJson, FormatOptions } from 'pretty-print-json';
import './Results.scss';

interface ResultsProps {
  data?: { [key: string]: any } | null;
  isLoading: boolean;
}

const Results: React.FC<ResultsProps> = ({ data, isLoading }) => {
  const formatOptions: FormatOptions = { indent: 2, linkUrls: true, linksNewTab: true };

  const headers = data
    ? {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
      }
    : null;

  const results = data
    ? {
        abilities: data.abilities,
        sprites: data.sprites,
        stats: data.stats,
        types: data.types,
      }
    : null;

  return (
    <section>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {headers ? (
            <div className="headers">
              <h2>Headers</h2>
              <div
                dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(headers, formatOptions) }}
              />
            </div>
          ) : (
            'No headers available'
          )}

          {results ? (
            <div className="results">
              <h2>Results</h2>
              <div
                dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(results, formatOptions) }}
              />
            </div>
          ) : (
            'No results available'
          )}
        </>
      )}
    </section>
  );
};

export default Results;