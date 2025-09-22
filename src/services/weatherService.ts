const API_KEY = 'YOUR_API_KEY'; // Replace with your actual key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city: string, country: string = '') => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch weather');
  return response.json();
};

export const fetchForecast = async (city: string, country: string = '') => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch forecast');
  return response.json();
};