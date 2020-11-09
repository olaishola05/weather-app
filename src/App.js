import React from "react";
import Weather from "./components/Weather";

require("dotenv").config();

function App() {
    return (
        <main className="md:w-1/2 sm:w-full bg-white m-auto h-auto">
            <h1 className="text-center mt-4 text-xl font-bold">
                Weather App
            </h1>
            <Weather />
        </main>
    );
}

export default App;
