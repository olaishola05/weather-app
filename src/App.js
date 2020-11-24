import React, { Fragment } from "react";
import Weather from "./components/Weather";

require("dotenv").config();

function App() {
    const headerStyle = {
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "20px",
    };
    return (
        <Fragment>
            <h1 style={headerStyle}>Weather App</h1>
            <Weather />
        </Fragment>
    );
}

export default App;
