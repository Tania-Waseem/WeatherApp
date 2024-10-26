import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4 z-10">
      {forecast.map((day, index) => {
        const iconUrl = `https://openweathermap.org/img/wn/${day.icon}.png`;
        return (
          <div key={index} className="bg-transparent p-4 rounded-lg shadow text-center">
            <p className="font-semibold">{day.day}</p>
            <img src={iconUrl} alt={day.description} className="w-16 h-16 mx-auto" />
            <p className="text-lg">{day.temperature}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
