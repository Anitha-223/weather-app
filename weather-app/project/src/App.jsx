import React, { useState, useEffect } from 'react';
import { CloudSun } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import { getCurrentWeather, getCurrentWeatherByCoords, getForecast } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeatherData = async (city) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setWeather({
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].main,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        visibility: weatherData.visibility,
        pressure: weatherData.main.pressure,
        feelsLike: weatherData.main.feels_like,
        city: weatherData.name,
        country: weatherData.sys.country,
        description: weatherData.weather[0].description
      });
      
      const processedForecast = forecastData.list.slice(0, 5).map((item, index) => {
        const date = new Date(item.dt * 1000);
        const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
        
        return {
          date: date.toLocaleDateString(),
          day: days[index] || `Day ${index + 1}`,
          temp: item.main.temp,
          condition: item.weather[0].main,
          description: item.weather[0].description
        };
      });
      
      setForecast(processedForecast);
    } catch (error) {
      console.error('Error loading weather data:', error);
      setError('Unable to load weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const weatherData = await getCurrentWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            
            setWeather({
              temp: weatherData.main.temp,
              condition: weatherData.weather[0].main,
              humidity: weatherData.main.humidity,
              windSpeed: weatherData.wind.speed,
              visibility: weatherData.visibility,
              pressure: weatherData.main.pressure,
              feelsLike: weatherData.main.feels_like,
              city: weatherData.name,
              country: weatherData.sys.country,
              description: weatherData.weather[0].description
            });
          } catch (error) {
            setError('Unable to get weather for your location.');
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          setError('Location access denied. Please search for a city manually.');
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    loadWeatherData('New York'); // Default city
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CloudSun className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WeatherPro
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get accurate weather information and forecasts for any city worldwide
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={loadWeatherData}
          onLocationSearch={handleLocationSearch}
          isLoading={isLoading}
        />

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}

        {/* Weather Content */}
        {!isLoading && weather && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            
            <div>
              {forecast.length > 0 && <ForecastCard forecast={forecast} />}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            Built with React & OpenWeatherMap API
          </p>
          <p className="text-sm text-gray-500 mt-2">
            * Currently using demo data. Add your OpenWeatherMap API key to get real weather data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;