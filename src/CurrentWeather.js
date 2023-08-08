import classes from "./CurrentWeather.module.css";


export default function CurrentWeather(props) {


    const { city, temp, condition, iconPath } = props;

    console.log(iconPath);

    return (
        <div className={classes.CurrentWeather}>
            <img src={iconPath} height="125px" width="125px" />
            <div className={classes.weatherInfo}>
                <p>Today</p>
                <p className={classes.cityName}>{city}</p>
                <p>Temperature: {`${temp} `}<sup>o</sup>C</p>
                <p>{condition}</p>
            </div>
        </div>
    );
}