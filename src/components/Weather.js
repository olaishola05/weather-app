import React, { useState, useEffect } from "react";
// import Location from "./Location";

const api_key = "1cce10cbc7abbd74750d207a13ed71f1";

function Weather() {
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const userLocation = () => {
        function showLocation(position) {
            fetchWeather(
                position.coords.latitude,
                position.coords.longitude
            );
        }
        const error = () => {
            alert("Unable to retrieve your location");
        };
        function getLocation() {
            if (!navigator.geolocation) {
                alert(
                    "Geolocation is not supported by your browser"
                );
            } else {
                alert("Geolocation supported");
                navigator.geolocation.getCurrentPosition(
                    showLocation,
                    error
                );
            }
        }
    };

    const fetchWeather = (lat, lon) => {
        const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
        fetch(weather_url)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                    return resp.json();
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    throw new Error(resp.statusText);
                }
            })
            .then((location) => {
                console.log(location);
                const { name } = location;
                const { country } = location.sys;
                const {
                    temp,
                    temp_min,
                    temp_max,
                    feels_like,
                    humidity,
                } = location.main;
                const {
                    description,
                    icon,
                } = location.weather[0];
                const { speed, deg } = location.wind;
                setLocation(location);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    if (isError) {
        return <div>error loading</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <>
            <section className="bg-blue-100 m-3">
                <form className="w-3/4 m-auto">
                    <label
                        htmlFor="city"
                        className="p-3 text-gray-900 font-bold "
                    >
                        Enter City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="w-56"
                    />

                    <button className="bg-blue-500 font-bold text-white py-2 px-4 rounded mx-4 my-4">
                        Search
                    </button>
                </form>
                <hr />

                <div className="flex-col bg-white h-auto rounded mx-4 my-5 border-none">
                    <h1>
                        {location.name},{location.country}
                    </h1>
                    {/* <h2>{city.main.humidity}</h2>
                    <h3>{city.weather.description}</h3>
                    <h3>{city.wind.deg}</h3>
                    <img src={city.icon} alt="" /> */}
                </div>
            </section>
        </>
    );
}

export default Weather;
