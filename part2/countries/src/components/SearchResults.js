import * as React from "react";

import CountryInfo from "./CountryInfo";

const SearchResults = ({ countries, onChangeFilter }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (countries.length > 1) {
    return (
      <>
        <h2>Results</h2>
        {countries.map(c => (
          <ListItem
            key={c.name}
            name={c.name}
            onChangeFilter={onChangeFilter}
          />
        ))}
      </>
    );
  } else if (countries.length === 1) {
    const data = countries[0];
    return (
      <div>
        <CountryInfo
          name={data.name}
          capital={data.capital}
          population={data.population}
          languages={data.languages}
          flag={data.flag}
        />
      </div>
    );
  } else {
    return <div>Can't find anything.</div>;
  }
};

const ListItem = ({ name, onChangeFilter }) => (
  <div>
    {name} <button onClick={() => onChangeFilter(name)}>show</button>
  </div>
);

export default SearchResults;
