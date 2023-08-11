import weatherConditions from "../weather_conditions.json";


export function getIconPath(code, isDay = true) {
    const time = isDay ? "day" : "night";
    const currentCondition = weatherConditions.find(el => el.code === code);
    return `/icons/${time}/${currentCondition.icon}.png`;
}