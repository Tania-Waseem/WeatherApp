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
    <div className="text-center p-4">
      <input
        type="text"
        placeholder="Enter a City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="py-3 px-6 w-[700px] text-lg rounded-3x1 border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md"
      />
    </div>
  );
};

export default SearchBar;
