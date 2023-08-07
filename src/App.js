import classes from "./App.module.css";
import WeekdayWeather from "./WeekdayWeather";


function App() {
  return (
    <div className={classes.App}>
      <form>
        <input
          className={classes.cityInput}
          type="text"
          id="city"
          name="city"
          placeholder="Enter city here..." />
      </form>
      <div className={classes.myCard}>
        <div className={classes.todaysWeather}>
          <span className={`
          material-symbols-rounded 
          ${classes.todaysWeatherIcon} 
          sunny`}>
            sunny
          </span>
          <div className={classes.weatherInfo}>
            <p>Today</p>
            <p className={classes.cityName}>New York</p>
            <p>Temperature: 17<sup>o</sup>C</p>
            <p>Clear sky</p>
          </div>
        </div>
        <div className={classes.weekdaysContainer}>
          <WeekdayWeather
            day="Wednesday"
            icon="sunny"
            temperature={27} />
          <WeekdayWeather
            day="Thursay"
            icon="cloud"
            temperature={18} />
          <WeekdayWeather
            day="Friday"
            icon="partly_cloudy_day"
            temperature={21} />
          <WeekdayWeather
            day="Saturday"
            icon="sunny"
            temperature={25} />
        </div>
      </div>
    </div>
  );
}

export default App;
