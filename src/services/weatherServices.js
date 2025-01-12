import { DateTime } from "luxon";
const API_KEY = "bc58356a09a4e6d3aaaab300e99bc1dc"; // Add your API key here
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data: ", error));
};
const iconUrlFromCode = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local Time:' h:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
const formatCurrentWeatherData = (data) => {
  console.log(data);
  const {
    coord: { lat, lon },
    main: { temp, temp_min, temp_max, humidity, feels_like },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    temp_min,
    temp_max,
    humidity,
    feels_like,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "h:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "h:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    speed,
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};
const formatForecastWeather = (secs, offset, data) => {
  //HourlyForecast
  const hourlyForecast = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "h:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);
  //DailyForecast
  const dailyForecast = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourlyForecast, dailyForecast };
};

const getFormattedWeatherDate = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeatherData);
  const { dt, timezone, lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};
export default getFormattedWeatherDate;
