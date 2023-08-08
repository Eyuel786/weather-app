import classes from "./ForecastDay.module.css";


export default function ForecastDay(props) {

    const { day, avgTemp, iconPath } = props;

    return (
        <div className={classes.ForecastDay}>
            <p>{day}</p>
            <img src={iconPath} height="75px" width="75px" />
            <p>{`${avgTemp} `}<sup>o</sup>C</p>
        </div>
    );
}