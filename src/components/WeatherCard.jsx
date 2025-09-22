import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Wind, Eye, Droplets } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    const iconClass = "w-16 h-16 text-white drop-shadow-lg";
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={iconClass} />;
      case 'clouds':
        return <Cloud className={iconClass} />;
      case 'rain':
        return <CloudRain className={iconClass} />;
      case 'snow':
        return <CloudSnow className={iconClass} />;
      case 'thunderstorm':
        return <Zap className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const getBackgroundGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'thunderstorm':
        return 'from-purple-600 via-purple-700 to-purple-800';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-xl opacity-90">{weather.country}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-light">{Math.round(weather.temp)}°</p>
          <p className="text-lg opacity-90 capitalize">{weather.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        {getWeatherIcon(weather.condition)}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Droplets className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <p className="text-sm opacity-80">Humidity</p>
          <p className="text-lg font-semibold">{weather.humidity}%</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Wind className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <p className="text-sm opacity-80">Wind</p>
          <p className="text-lg font-semibold">{weather.windSpeed} m/s</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Eye className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <p className="text-sm opacity-80">Visibility</p>
          <p className="text-lg font-semibold">{weather.visibility / 1000} km</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 opacity-80 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current rounded-full"></div>
          </div>
          <p className="text-sm opacity-80">Pressure</p>
          <p className="text-lg font-semibold">{weather.pressure} hPa</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg opacity-90">
          Feels like <span className="font-semibold">{Math.round(weather.feelsLike)}°</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;