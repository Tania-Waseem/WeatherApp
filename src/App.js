import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null); // State for weather data

  const handleSearch = async (city) => {
    const apiKey = '5dbce235fc93638012d050f8958bf15a'; 
    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      const weatherData = weatherResponse.data;

      // Fetch forecast data
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
      const forecastData = forecastResponse.data.list;

      const formatTemperature = (temp) => {
        return temp % 1 === 0 ? temp.toFixed(0) : temp.toFixed(1);
      }

      // Get today's date
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 1); // Day after today

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7); // Day before the same day next week
      endDate.setHours(0, 0, 0, 0); // Reset time to midnight

      // Filter forecast data for the desired range
      const filteredForecast = forecastData.reduce((acc, curr) => {
        const forecastDate = new Date(curr.dt_txt);
        if (forecastDate >= startDate && forecastDate < endDate) {
          const dateString = curr.dt_txt.split(" ")[0]; // Extract the date (YYYY-MM-DD)
          const day = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name

          if (!acc[dateString]) {
            acc[dateString] = {
              date: dateString,
              day: day, // Add the day name
              temperature: formatTemperature(curr.main.temp),
              description: curr.weather[0].description,
              icon: curr.weather[0].icon, // Store icon code instead of full URL here
            };
          }
        }
        return acc;
      }, {});

      // Convert the object back to an array
      const forecastArray = Object.values(filteredForecast);

      const data = {
        city: weatherData.name,
        temperature: formatTemperature(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        forecast: forecastArray, // Use the filtered forecast data
      };

      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Optionally handle error here (e.g., show a message to the user)
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-blue-100 overflow-hidden">
      {/* Background Cloud Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-4xl p-8">
        <SearchBar onSearch={handleSearch} />
        {weather && (
          <>
            <CurrentWeather
              city={weather.city}
              temperature={weather.temperature}
              description={weather.description}
              icon={weather.icon}
            />
            <Forecast forecast={weather.forecast} /> {/* Use weather.forecast */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
