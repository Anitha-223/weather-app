import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Zap } from 'lucide-react';

interface ForecastData {
  date: string;
  day: string;
  temp: number;
  condition: string;
  description: string;
}

interface ForecastCardProps {
  forecast: ForecastData[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-8 h-8 text-blue-600";
    
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

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                {getWeatherIcon(day.condition)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{day.day}</p>
                <p className="text-sm text-gray-600 capitalize">{day.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{Math.round(day.temp)}°</p>
              <p className="text-sm text-gray-600">{day.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;