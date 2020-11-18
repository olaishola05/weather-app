import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function Weather() {
    const [city, setCity] = useState("");
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    function showLocation(position) {
        fetchWeather(
            position.coords.latitude,
            position.coords.longitude
        );
        weatherForecast(
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
            console.log("Geolocation supported");
            navigator.geolocation.getCurrentPosition(
                showLocation,
                error,
                fetchWeather,
                handleSubmit,
                weatherQuery,
                weatherForecast
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
            .then((city) => {
                console.log(city);
                setCity(city);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };
    const weatherQuery = (query) => {
        const location_url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
        if (query) {
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
                .then((city) => {
                    console.log(city);
                    setIsLoading(false);
                    setCity(city);
                })
                .catch((error) => console.log(error));
            setQuery("");
        }
    };

    const weatherForecast = (lon, lat) => {
        const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        if (lon && lat) {
            fetch(forecastUrl)
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
                .then((city) => {
                    console.log("my city info :", city);
                    setIsLoading(false);
                    // setCity(city);
                })
                .catch((error) => console.log(error));
        }
    };

    const queryForecast = (query) => {
        const cityForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`;
        if (query) {
            fetch(cityForecast)
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
                .then((city) => {
                    console.log("my query info :", city);
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        weatherQuery(query);
        queryForecast(query);
    };

    useEffect(() => {
        getLocation();
    }, []);

    if (isError) {
        return <div>Error...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <main className="w-full bg-white">
                <header>
                    <form
                        className="w.w-screen m-auto my-4"
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
                            id="city"
                            name="city"
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            className="w-6/12 py-2 px-2"
                            placeholder="Enter Location"
                        />

                        <button className="bg-blue-500 font-bold text-white py-2 px-4 rounded mx-4 my-4">
                            Search
                        </button>
                    </form>
                    <hr />
                </header>
                <article className="flex flex-row m-2">
                    <section className="bg-blue-100 mx-6 border-2 border-gray-600">
                        <div className="flex-col  rounded mx-4 my-5 border-none">
                            <h1>
                                {city.name}, {city.sys.country}
                            </h1>
                            <h2>
                                Weather feels like:{" "}
                                {city.main.feels_like}
                            </h2>
                            <h2>
                                Humidity {city.main.humidity}
                            </h2>

                            <p>
                                Description:{" "}
                                {city.weather[0].description}
                            </p>

                            <h3>
                                Degree: {city.wind.deg}{" "}
                                <sup>o</sup>
                            </h3>
                        </div>
                    </section>

                    <section className="border-2 border-gray-600 px-3 py-3 w-4/6">
                        <h1>city: {city.name}</h1>
                        <p>
                            Description:{" "}
                            {city.weather[0].description}
                        </p>
                    </section>
                </article>
            </main>
        </>
    );
}

export default Weather;
