import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import ForecastDay from "./ForecastDay";
import CurrentWeather from "./CurrentWeather";
import { getDay } from "./utils/getDay";
import { getIconPath } from "./utils/getIconPath";

import classes from "./App.module.css";
import ErrorMessage from "./ErrorMessge";


function App() {
  const cityInputRef = useRef(null)
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const errorTimeoutRef = useRef(null);

  const handleCloseErrorMessage = () => setError(null);

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
      setError("Please enter a valid city name");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData("Addis Ababa");
  }, [fetchWeatherData]);

  useEffect(() => {
    if (error) {
      errorTimeoutRef.current = setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      clearTimeout(errorTimeoutRef.current);
    }
  }, [error]);

  const onSubmit = e => {
    e.preventDefault();

    const city = cityInputRef.current.value;
    if (!city) {
      return;
    }

    fetchWeatherData(city);
  }
  // Add Error snackbar
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
      {!loading && error &&
        <ErrorMessage
          errorText={error}
          onClose={handleCloseErrorMessage} />}
      {!loading && weatherData &&
        <div className={classes.myCard}>
          <CurrentWeather
            city={weatherData.location.name}
            temp={weatherData.current.temp}
            condition={weatherData.current.condition}
            iconPath={weatherData.current.iconPath}
            altText={weatherData.current.condition}
            isDay={weatherData.current.isDay} />
          <div className={classes.weekdaysContainer}>
            {weatherData.forecast.map((el, index) => (
              <ForecastDay
                key={index}
                day={el.weekDay}
                avgTemp={el.avgTemp}
                iconPath={el.iconPath}
                condition={el.condition}
                altText={el.condition} />
            ))}
          </div>
        </div>}
    </div>
  );
}

export default App;