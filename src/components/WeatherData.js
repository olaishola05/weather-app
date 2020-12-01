import React from "react";
import {
    WeatherDegree,
    Month,
    Weekday,
    Day,
} from "../helpers/utils";

function WeatherData({ data, handleSubmit }) {
    const {
        name,
        country,
        temp,
        description,
        temp_min,
        temp_max,
        icon,
        feels_like,
        speed,
        deg,
        humidity,
    } = data;
    return (
        <>
            <header>
                {Weekday}, {Month} {Day}
                <h2>
                    {name}, {country}
                </h2>
                <h3 className="description">{description}</h3>
            </header>

            <div className="temp-main">
                <h5>Feels like {feels_like} °</h5>
                <h1 className="temperature">{temp}°</h1>
                <div className="hi-lo">
                    <h5>H {temp_max}°</h5>
                    <h5>L {temp_min}°</h5>
                    <h4>{humidity} %</h4>
                </div>
            </div>
        </>
    );
}

export default WeatherData;
