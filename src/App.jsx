import { useState, useEffect } from "react";
import TimeAndLocatin from "./components/TimeAndLocatin";
import Inputs from "./components/Inputs";
import TopButtons from "./components/TopButtons";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherDate from "./services/weatherServices";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [query, setQuery] = useState({ q: "Alexandria" });
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const message = query.q
        ? `Showing weather for ${query.q}`
        : "Showing weather for your location";
      toast.info(message);

      const data = await getFormattedWeatherDate({
        ...query,
        units,
      }).then((data) => {
        toast.success(
          `Weather data loaded successfully For ${data.name} , ${data.country}`
        );
        setWeatherData(data);
      });
      console.log(data);
    };
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (weatherData) {
      const { details } = weatherData;
      if ((details === "Clear") | (details === "Sunny") | (details === "Hot")) {
        return "bg-gradient-to-br from-yellow-600 to-orange-700";
      } else if (
        (details === "Clouds") |
        (details === "Mist") |
        (details === "Smoke") |
        (details === "Haze") |
        (details === "Dust") |
        (details === "Fog") |
        (details === "Sand") |
        (details === "Ash") |
        (details === "Squall") |
        (details === "Tornado")
      ) {
        return "bg-gradient-to-br from-gray-400 to-gray-500";
      } else if (
        (details === "Rain") |
        (details === "Cold") |
        (details === "Drizzle") |
        (details === "Thunderstorm") |
        (details === "Thunderstorm with light rain") |
        (details === "Thunderstorm with rain") |
        (details === "Thunderstorm with heavy rain") |
        (details === "Light thunderstorm") |
        (details === "Heavy thunderstorm") |
        (details === "Ragged thunderstorm") |
        (details === "Thunderstorm with light drizzle") |
        (details === "Thunderstorm with drizzle") |
        (details === "Thunderstorm with heavy drizzle")
      ) {
        return "bg-gradient-to-br from-cyan-600 to-blue-700";
      } else if (details === "Snow") {
        return "bg-gradient-to-br from-gray-300 to-gray-400";
      }
    }
    return "bg-gradient-to-br from-cyan-600 to-blue-700";
  };

  return (
    <div
      className={`w-full min-h-screen mx-auto py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} text-white`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weatherData && (
        <>
          <TimeAndLocatin weatherData={weatherData} />
          <TempAndDetails weatherData={weatherData} units={units} />
          <Forecast
            title="3 Hours Step Forecast"
            data={weatherData.hourlyForecast}
          />
          <Forecast title="Daily Forecast" data={weatherData.dailyForecast} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
