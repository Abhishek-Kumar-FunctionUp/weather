import React, { useState } from "react";
import "./index.css";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "f56f24967aaf51182d1d4df628297c6d"

  async function searchLocation() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location} &appid=${apiKey}`);
    const city = await res.json();
    setData(city);
    setLocation("")
  }

  function handleCapture(e) {
    setLocation(e.target.value);
  }
  
  return (
    <div className="App">
    <nav className="navbar">
    ⛅Weather
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
          </div>
          <div className="temp">
            <h1>{data.main?.temp} °F</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="max">
            <p>{data.main?.temp_max} °F</p>
          </div>
          <div className="min">
            <p>{data.main?.temp_min} °F</p>
          </div>
          <div className="humidity">{data.main?.humidity} %</div>
        </div>
      </div>
    </div>
  );
}

export default App;
