import classes from "./WeekdayWeather.module.css";


export default function WeekdayWeather(props) {

    const { day, icon, temperature } = props;

    return (
        <div className={classes.WeekdayWeather}>
            <p>{day}</p>
            <span className={`material-symbols-rounded 
            ${icon}
            ${classes.WeekdayWeatherIcon}`}>
                {icon}
            </span>
            <p>{`${temperature} `}<sup>o</sup>C</p>
        </div>
    );
}