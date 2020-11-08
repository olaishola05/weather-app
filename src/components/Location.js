import React from "react";
import { geolocated } from "react-geolocated";

function Location(coords) {
    // const {
    //     latitude,
    //     longitude,
    //     isGeolocationAvailable,
    //     isGeolocationEnabled,
    // } = coords;
    return !coords.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !coords.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                    {console.log(coords.latitude)}
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                    {console.log(coords.longitude)}
                </tr>
                {/* <tr>
                    <td>altitude</td>
                    <td>{altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{speed}</td>
                </tr> */}
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Location);
