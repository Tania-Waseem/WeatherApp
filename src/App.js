// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import backgroundImage from './assets/clouds.jpg';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      setError(null);
      const apiKey = '5dbce235fc93638012d050f8958bf15a';
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
  
      const weatherData = weatherRes.data;
      const forecastData = forecastRes.data.list;
  
      const forecastMap = {};
      const timezoneOffset = weatherData.timezone; // Get timezone offset in seconds
      const localDate = new Date(Date.now() + timezoneOffset * 1000); // Current local date in city timezone
      const isDaytime = localDate.getHours() >= 6 && localDate.getHours() < 18; // Define daytime
  
      // Calculate tomorrow's date
      const tomorrow = new Date(localDate);
      tomorrow.setDate(localDate.getDate() + 1);
      const tomorrowDateString = tomorrow.toLocaleDateString(); // Format the date
  
      // Loop through the forecast data
      forecastData.forEach((item) => {
        const forecastDate = new Date(item.dt * 1000);
        const dateString = forecastDate.toLocaleDateString();
  
        // Check if the forecast is for tomorrow or later
        if (dateString >= tomorrowDateString) {
          const forecastHour = forecastDate.getHours();
  
          const isForecastDaytime = (forecastHour) => forecastHour >= 6 && forecastHour < 18;
          const isForecastNighttime = (forecastHour) => forecastHour < 6 || forecastHour >= 18;
          
          // Determine if we want daytime or nighttime forecasts
          if ((isDaytime && isForecastDaytime(forecastHour)) || 
              (!isDaytime && isForecastNighttime(forecastHour))) {
          
            const day = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
  
            // Only add the day if it hasn't been added yet
            if (!forecastMap[dateString]) {
              forecastMap[dateString] = {
                day,
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              };
            }
          }
        }
      });
  
      // Convert the object into an array and take the first 4 entries
      const forecastArray = Object.values(forecastMap).slice(0, 4);
  
      setWeather({
        city: weatherData.name,
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        forecast: forecastArray,
      });
    } catch (err) {
      setError("Unable to fetch weather data.");
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
      <div className="relative z-10 w-full max-w-xl text-white p-6">
        <SearchBar onSearch={fetchWeatherData} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weather && (
          <>
            <CurrentWeather
              city={weather.city}
              temperature={weather.temperature}
              description={weather.description}
              icon={weather.icon}
            />
            <Forecast forecast={weather.forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
