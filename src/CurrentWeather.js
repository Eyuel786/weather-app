import classes from "./CurrentWeather.module.css";


export default function CurrentWeather(props) {

    const {
        city,
        temp,
        isDay,
        condition,
        iconPath,
        altText
    } = props;

    return (
        <div className={classes.CurrentWeather}>
            <img
                src={iconPath}
                height="125px"
                width="125px"
                alt={altText} />
            <div className={classes.weatherInfo}>
                <p>{isDay ? "Today" : "Tonight"}</p>
                <p className={classes.cityName}>{city}</p>
                <p>Temperature: {`${temp} `}<sup>o</sup>C</p>
                <p>{condition}</p>
            </div>
        </div>
    );
}