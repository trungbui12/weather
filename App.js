import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const API_KEY = "09a71427c59d38d6a34f89b47d75975c"; // Thay bằng API Key của bạn
  const CITY = "Hanoi"; // Tên thành phố

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`
      );
      const data = await response.json();
      setWeatherData({
        temperatureC: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        weather: data.weather[0].main,
        day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        precipitation: data.rain ? data.rain["1h"] || 0 : 0,
      });
    };
    fetchWeather();
  }, []);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  if (!weatherData) return <div className="loading">Loading...</div>;

  const temperature = isCelsius
    ? weatherData.temperatureC
    : Math.round((weatherData.temperatureC * 9) / 5 + 32);

  return (
    <div className="weather-widget">
      <div className="weather-left">
        <div className="weather-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
            alt="cloudy"
          />
        </div>
        <div className="temperature" onClick={toggleUnit}>
          {temperature}
          <span className="unit">°{isCelsius ? "C" : "F"}</span>
        </div>
      </div>
      <div className="weather-right">
        <h2>Weather</h2>
        <p>
          {weatherData.day} {weatherData.time}
        </p>
        <p>{weatherData.weather}</p>
        <div className="details">
          <p>Precipitation: {weatherData.precipitation}%</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind: {weatherData.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default App;

