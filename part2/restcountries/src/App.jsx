import { useEffect, useState } from "react";

import countriesService from "./services/countries";

const Weather = ({ weather }) => {
  console.log(weather);
  if (weather === null || weather === undefined) {
    return null;
  }

  return (
    <div>
      <div>
        <strong>temperature:</strong> {weather.main.temp} Celsius
      </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
      <div>
        <strong>wind:</strong> {weather.wind.speed} m/s
      </div>
    </div>
  );
};

const Countries = ({ countries, onShow }) => {
  if (countries.length === 1) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return countries.map((country) => (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => onShow(country.name.common.toLowerCase())}>
        show
      </button>
    </div>
  ));
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div>{message}</div>;
};

const Country = ({ country }) => {
  if (country === null || country === undefined) {
    return null;
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      {/* <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul> */}
      <img src={country.flags.png} alt="flag" width="100" />
      <h3>Weather in {country.capital[0]}</h3>
      <Weather country={country.capital[0]} />
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [notification, setNotification] = useState(null);
  const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   countriesService.getAll().then((countries) => setCountries(countries));

  // }

  const getData = () => {
    if (query === "") {
      setCountries([]);
      setNotification(null);
      setWeather(null);
      return;
    }

    countriesService.query(query).then((countries) => {
      if (countries.length > 10) {
        setCountries([]);
        setNotification("Too many matches, specify another filter");
        setWeather(null);
        return;
      }

      setNotification(null);
      setCountries(countries);

      if (countries.length === 1) {
        countriesService
          .getweather(countries[0].capital[0])
          .then((weather) => setWeather(weather));
      }
    });
  };

  useEffect(getData, [query]);

  return (
    <div>
      <h1>Rest Countries</h1>
      <div>
        find countries{" "}
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <Notification message={notification} />
      <Countries countries={countries} onShow={setQuery} />
      <Country country={countries[0]} weather={weather} />
      <Weather weather={weather} />
    </div>
  );
};
export default App;
