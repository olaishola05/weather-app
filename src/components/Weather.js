import React, { useState, useEffect } from "react";
import Location from "./Location";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import WeatherData from "./WeatherData";

const API_KEY = process.env.REACT_APP_API_KEY;

function Weather() {
    const [city, setCity] = useState("");
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [dailyForecasts, setDailyForecasts] = useState([]);
    // const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        getLocation();
    }, []);

    function showLocation(position) {
        console.log(position);
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
                fetchWeather,
                error,
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
                const { name } = city;
                const { country } = city.sys;
                const {
                    temp,
                    temp_min,
                    temp_max,
                    feels_like,
                    humidity,
                } = city.main;
                const { description, icon } = city.weather[0];
                const { speed, deg } = city.wind;

                const data = {
                    name,
                    country,
                    description,
                    icon,
                    temp: temp.toFixed(1),
                    feels_like: feels_like.toFixed(1),
                    temp_min: temp_min.toFixed(1),
                    temp_max: temp_max.toFixed(1),
                    speed,
                    deg,
                    humidity,
                };
                // console.log(data);
                setCity(data);
                // setWeatherData(data);
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
        console.log({ lon, lat });
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
                .then((result) => {
                    console.log("my city info :", result);
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
                .then((days) => {
                    const fiveDaysForecast = days.list.filter(
                        (daily) =>
                            daily.dt_txt.includes("18:00:00")
                    );

                    setDailyForecasts(fiveDaysForecast);

                    console.log(fiveDaysForecast);
                    setIsLoading(false);
                })
                .catch((error) => console.log(error));
        }
    };

    // const locationForecast = () => {};
    const handleSubmit = (e) => {
        e.preventDefault();
        weatherQuery(query);
        queryForecast(query);
    };

    const fiveDays = dailyForecasts.map((data, index) => (
        <Location location={data.dt_txt} key={index} />
    ));

    if (isError) {
        return <div>Error...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <main className="">
                <Container>
                    <Form
                        className="mb-3 form-container"
                        onSubmit={handleSubmit}
                    >
                        <Form.Group
                            as={Row}
                            controlId="formBasicText"
                        >
                            <Form.Label
                                htmlFor="location"
                                className=""
                            >
                                Enter City:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    controlId
                                    className="input-width"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={query}
                                    onChange={(e) =>
                                        setQuery(e.target.value)
                                    }
                                    placeholder="Enter
                                Location"
                                ></Form.Control>
                            </Col>
                            <Form.Text className="text-muted text-center">
                                Search for your preferred weather
                                location
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn"
                        >
                            Search
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <WeatherData
                                data={city}
                                handleSubmit={handleSubmit}
                            />
                        </Col>

                        <Col>
                            <section className="">
                                <h1>city: Hi </h1>
                                {fiveDays}
                            </section>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}

export default Weather;
