import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onLocationSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-lg overflow-hidden">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-14 pr-4 py-4 text-lg text-gray-800 bg-transparent outline-none"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="button"
            onClick={onLocationSearch}
            disabled={isLoading}
            className="px-6 py-4 text-gray-600 hover:text-blue-600 transition-colors duration-200 border-l border-gray-200"
          >
            <MapPin className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;