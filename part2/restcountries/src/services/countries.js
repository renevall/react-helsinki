import axios from "axios";

const weather_key = import.meta.env.VITE_WEATHER_KEY;

const query = (name) => {
  const rest = axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/all`
  );
  return rest.then((response) =>
    response.data.filter((country) => {
      if (country.name.common.toLowerCase().includes(name.toLowerCase())) {
        return country;
      }
    })
  );
};

const getweather = (capital) => {
  const weather = axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${weather_key}`
    )
    .then((response) => {
      const data = response.data[0];
      const weather = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${weather_key}`
      );
      return weather;
    });

  return weather.then((response) => response.data);
};

export default { query, getweather };
