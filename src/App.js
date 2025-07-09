import React, { useState } from "react";
import "./index.css";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";

  function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  async function searchLocation() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location} &appid=${apiKey}`
    );
    const city = await res.json();
    setData(city);
    setLocation("");
  }

  function handleCapture(e) {
    setLocation(e.target.value);
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="App-logo">⛅</div>
      </nav>
      <input
        className="search"
        type="text"
        placeholder="Enter Location"
        onChange={handleCapture}
        onClick={searchLocation}
        value={location}
      />
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="temp_card">
              {data.weather && data.weather[0] && (
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </div>
          </div>
          <div className="temp">
            <h1>
              {data.main?.temp ? kelvinToCelsius(data.main?.temp) + "°C" : ""}
            </h1>
          </div>
        </div>
        {data.main && (
          <div className="bottom">
            <div className="temp_card">
              <p className="label">Max. Temp.</p>
              <p>
                {data.main?.temp_max
                  ? kelvinToCelsius(data.main?.temp_max) + "°C"
                  : ""}
              </p>
            </div>
            <div className="temp_card">
              <p className="label">Min. Temp.</p>
              <p>
                {data.main?.temp_min
                  ? kelvinToCelsius(data.main?.temp_min) + "°C"
                  : ""}
              </p>
            </div>
            <div className="temp_card">
              <p className="label">Humidity</p>
              <p>{data.main?.humidity ? data.main?.humidity + "%" : ""}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
