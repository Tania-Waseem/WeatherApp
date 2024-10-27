import React from 'react';

const CurrentWeather = ({ city, temperature, description, icon }) => {
  return (
    <div className="bg-white bg-opacity-40 rounded-md p-4 text-center shadow-lg">
      <div className="text-6xl mb-4">
      <img 
        src={icon} 
        alt="Weather Icon"
        className="mx-auto w-24 h-24" // Use Tailwind classes for sizing
      />
      </div>
      <h2 className="text-4xl font-bold">{city}</h2>
      <p className="text-lg">Temperature: {temperature}°C</p>
      <p className="text-sm text-gray-600 capitalize">{description}</p>
    </div>
  );
};

export default CurrentWeather;
