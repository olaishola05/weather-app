import { WindDirection, Months, Weekdays } from "./text-arrays";

export const WeatherDegree = (degrees) => {
    const deg_value = Math.floor(degrees / 22.5 + 0.5);
    return WindDirection[deg_value % 16];
};

const date = new Date();
export const Month = Months[date.getMonth()];
export const Weekday = Weekdays[date.getDay()];
export const Day = date.getDate();
