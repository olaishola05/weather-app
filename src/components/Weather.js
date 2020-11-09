import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function Weather() {
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

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
                error,
                fetchWeather,
                handleSubmit
            );
        }
    }

    const fetchWeather = (lat, lon) => {
        const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const location_url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
        if (location) {
            fetch(location_url)
                .then((resp) => {
                    if (
                        resp.status >= 200 &&
                        resp.status <= 299
                    ) {
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
        }
        setLocation("");
    };

    useEffect(() => {
        getLocation();
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
                <form
                    className="w-3/4 m-auto"
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="location"
                        className="p-3 text-gray-900 font-bold "
                    >
                        Enter City:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                        className="w-56"
                        placeholder="Enter Location"
                    />

                    <button className="bg-blue-500 font-bold text-white py-2 px-4 rounded mx-4 my-4">
                        Search
                    </button>
                </form>
                <hr />

                <div className="flex-col bg-white h-auto rounded mx-4 my-5 border-none">
                    <h1>{location.name}</h1>
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
