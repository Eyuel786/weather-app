import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./App.module.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";
import CurrentWeather from "./CurrentWeather";
import weatherConditions from "./weather_conditions.json";


function getDay(dateString) {
  const dayIndex = new Date(dateString).getDay();

  switch (dayIndex) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}

function getIconPath(code, isDay = true) {
  const time = isDay ? "day" : "night";
  const currentCondition = weatherConditions.find(el => el.code === code);
  return `/icons/${time}/${currentCondition.icon}.png`;
}

function App() {
  const cityInputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async city => {
    try {
      setError(null);
      setLoading(true);

      const { data } = await axios.request({
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: {
          q: city,
          days: "3"
        },
        headers: {
          "X-RapidAPI-Key": "1a708579c0mshac2ece0f0172df0p1a6dbcjsn807319ab4da1",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
      });

      const transformedWeatherData = {
        location: {
          name: data.location.name,
          country: data.location.country
        },
        current: {
          code: data.current.condition.code,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          isDay: !!data.current.is_day,
          iconPath: getIconPath(
            data.current.condition.code,
            data.current.is_day
          )
        },
        forecast: data.forecast.forecastday.map(el => ({
          code: el.day.condition.code,
          iconPath: getIconPath(el.day.condition.code),
          date: el.date,
          weekDay: getDay(el.date),
          avgTemp: el.day.avgtemp_c,
          condition: el.day.condition.text
        }))
      };

      setWeatherData(transformedWeatherData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData("Addis Ababa");
  }, [fetchWeatherData]);

  const onSubmit = e => {
    e.preventDefault();

    const city = cityInputRef.current.value;
    if (!city) {
      return;
    }

    fetchWeatherData(city);
  }

  return (
    <div className={classes.App}>
      <form onSubmit={onSubmit}>
        <input
          className={classes.cityInput}
          type="text"
          id="city"
          name="city"
          placeholder="Enter city here..."
          ref={cityInputRef} />
      </form>
      {loading &&
        <div className={classes.spinnerContainer}>
          <div className={classes.spinner} />
        </div>}
      {!loading && weatherData &&
        <div className={classes.myCard}>
          <CurrentWeather
            city={weatherData.location.name}
            temp={weatherData.current.temp}
            condition={weatherData.current.condition}
            iconPath={weatherData.current.iconPath} />
          <div className={classes.weekdaysContainer}>
            {weatherData.forecast.map(el => (
              <ForecastDay
                day={el.weekDay}
                avgTemp={el.avgTemp}
                iconPath={el.iconPath} />
            ))}
          </div>
        </div>}
    </div>
  );
}

export default App;