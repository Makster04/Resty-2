import React from 'react';
import { prettyPrintJson, FormatOptions } from 'pretty-print-json';

import './Results.scss';


interface ResultsProps {
  data?: {
    count: number;
    results: Array<{ name: string, url: string}>;
  } | null;
  isLoading: boolean;
  formatOptions?: FormatOptions;
}

const Results: React.FunctionComponent<ResultsProps> = ({ data, isLoading, formatOptions }) => {

  const defaultOptions: FormatOptions = {
    indent: 2,
    linkUrls: true,
    linksNewTab: true,
  };
  const options = formatOptions || defaultOptions;

    return (
      <section>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: data ? prettyPrintJson.toHtml(data, options) : 'No data available' }}
        />
      )}
    </section>
    );
}

export default Results;
