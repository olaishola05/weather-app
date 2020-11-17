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
                weatherQuery
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
        const location_url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;
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
            setCity("");
            setQuery("");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        weatherQuery(query);
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
                        id="city"
                        name="city"
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
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
                    <h1>
                        {city.name}, {city.sys.country}
                    </h1>
                    <h2>
                        Weather feels like:{" "}
                        {city.main.feels_like}
                    </h2>
                    <h2>Humidity {city.main.humidity}</h2>

                    <p>
                        Description:{" "}
                        {city.weather[0].description}
                    </p>

                    <h3>
                        Degree: {city.wind.deg} <sup>o</sup>
                    </h3>
                </div>
            </section>
        </>
    );
}

export default Weather;
