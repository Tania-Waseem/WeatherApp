// src/components/Forecast.js
import React from 'react';

const Forecast = ({ forecast }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
    {forecast.map((day, index) => (
      <div key={index} className="bg-white bg-opacity-40 rounded-md p-4 text-center shadow-md">
        <p className="text-lg font-semibold">{day.day}</p>
        <img src={day.icon} alt={day.description} className="w-10 h-10 mx-auto my-2" />
        <p className="text-2xl font-bold">{day.temperature}°C</p>
        <p className="text-sm text-gray-600 capitalize">{day.description}</p>
      </div>
    ))}
  </div>
);

export default Forecast;
