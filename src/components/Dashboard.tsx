import { useEffect, useState } from "react";
import { fetchForecastWeather } from "../api/fetchForecastWeather";

const Dashboard: React.FC = () => {
  const [city, setCity] = useState("Guntur");
  const [country, setCountry] = useState("IN");
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadForecast = async () => {
    try {
      const forecastWeather = await fetchForecastWeather(city, country);
      setForecast(forecastWeather);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading weather data...</p>;
  }

  if (!forecast) {
    return <p className="text-center mt-10 text-red-500">No forecast available</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">WeatherPro</h1>
      <h2 className="text-xl font-semibold mb-2 text-center">
        {forecast.city}, {forecast.country}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {forecast.forecast.map((day: any, index: number) => (
          <div key={index} className="p-4 border rounded-lg shadow hover-lift animate-fade-in">
            <p className="font-semibold">{day.date}</p>
            <p>{day.description}</p>
            <p>🌡️ {day.temp}°C</p>
            <p>💧 Humidity: {day.humidity}%</p>
            <p>🌬️ Wind: {day.wind} m/s</p>
            <p>👁️ Visibility: {day.visibility / 1000} km</p>
            <p>📈 Pressure: {day.pressure} hPa</p>
            <p>🤗 Feels like: {day.feels_like}°C</p>
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-sm text-gray-500">
        Built with React & OpenWeatherMap API
      </p>
    </div>
  );
};

export default Dashboard;