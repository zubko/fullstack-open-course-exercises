import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchResults from './components/SearchResults'
import Filter from './components/Filter'

const useWebData = setter => {
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(resp => setter(resp.data))
      .catch(error => console.error(`Can't get web data: `, error));
  }, [setter]);
};

function App() {
  const [countries, setCountries] = useState([]);
  useWebData(setCountries);

  const [filter, setFilter] = useState("Sweden");

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  let filteredCountries = countries;
  if (filter) {
    const filterLowCase = filter.toLocaleLowerCase();
    filteredCountries = countries.filter(
      c => c.name.toLocaleLowerCase().indexOf(filterLowCase) !== -1
    );
  }

  return (
    <div>
      <Filter value={filter} onChange={setFilter} />
      {filter ? (
        <SearchResults
          countries={filteredCountries}
          onChangeFilter={setFilter}
        />
      ) : null}
    </div>
  );
}

export default App;
