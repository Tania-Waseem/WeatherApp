// src/components/CurrentWeather.js

import React from 'react';

const CurrentWeather = ({ city, temperature, description, icon }) => {
  return (
    <div className="bg-transparent p-12 rounded-lg shadow-xl text-center relative z-0">
      <div className="text-6xl mb-4">
      <img 
                src={icon} 
                className="w-16 h-16 mx-auto" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://openweathermap.org/img/wn/01d.png"; // Fallback icon
                }} 
              />
      </div>
      <h2 className="text-4xl font-bold">{city}</h2>
      <p className="text-lg">Temperature: {temperature}°C</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default CurrentWeather;
