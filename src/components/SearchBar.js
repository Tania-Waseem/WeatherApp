// src/components/SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(city); 
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Enter a City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-3/4 lg:w-4/5 px-4 py-2 mb-2 sm:mb-0 sm:mr-2 text-gray-800 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
