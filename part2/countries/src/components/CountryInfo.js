import React, { useEffect, useState } from "react";
import Axios from "axios";

const getWeatherUrl = city =>
  `https://api.apixu.com/v1/current.json?key=77de3f077a204778961114733191906&q=${city}`;

const CountryInfo = ({ name, capital, population, languages, flag }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let canceled = false;
    Axios.get(getWeatherUrl(capital))
      .then(resp => (!canceled ? setWeather(resp.data) : null))
      .catch(error => console.error(`Can't get weather:`, error));
    return () => {
      canceled = true;
    };
  }, [capital]);

  const renderWeather = ()=>(
    <>
    <h3>weather in {capital}</h3>
    <div><b>temperature: </b>{weather.current.temp_c}°C</div>
    <img src={weather.current.condition.icon} alt={`Condition: ${weather.current.condition.text}`} />
    <div><b>wind: </b>{weather.current.wind_kph}kph direction {weather.current.wind_dir}</div>
</>
  )

  return (
    <div>
      <h2>{name}</h2>
      <div>population: {population}</div>
      <div>capital: {capital}</div>
      <h3>languages</h3>
      <ul>
        {languages.map(l => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <img className="Country-flag" src={flag} alt="country's flag" />
      {
        weather ? renderWeather() : null
      }
    </div>
  );
};

export default CountryInfo;
