import classes from "./ForecastDay.module.css";


export default function ForecastDay(props) {

    const {
        day,
        avgTemp,
        iconPath,
        condition,
        altText
    } = props;

    return (
        <div className={classes.ForecastDay}>
            <p>{day}</p>
            <img
                src={iconPath}
                height="75px"
                width="75px"
                alt={altText} />
            <p>{condition}</p>
            <p>{`${avgTemp} `}<sup>o</sup>C</p>
        </div>
    );
}
