const API_KEY = 'your-openweathermap-api-key'; // You'll need to get this from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
}

// Mock data for demonstration purposes
const generateMockWeatherData = (cityName: string) => {
  const conditions = ['clear', 'clouds', 'rain', 'snow'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    name: cityName || 'Demo City',
    sys: { country: 'US' },
    main: {
      temp: Math.round(Math.random() * 30 + 5),
      feels_like: Math.round(Math.random() * 30 + 5),
      humidity: Math.round(Math.random() * 100),
      pressure: Math.round(Math.random() * 100 + 1000)
    },
    weather: [{
      main: randomCondition,
      description: `${randomCondition} skies`
    }],
    wind: { speed: Math.round(Math.random() * 20) },
    visibility: Math.round(Math.random() * 10000 + 5000)
  };
};

const generateMockForecastData = () => {
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
  const conditions = ['clear', 'clouds', 'rain', 'snow'];
  
  return {
    list: days.map((_, index) => ({
      dt: Date.now() + (index * 24 * 60 * 60 * 1000),
      main: {
        temp: Math.round(Math.random() * 30 + 5)
      },
      weather: [{
        main: conditions[Math.floor(Math.random() * conditions.length)],
        description: 'clear skies'
      }]
    }))
  };
};

export const getCurrentWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    // For demo purposes, using mock data
    // In production, uncomment the fetch call below and use your API key
    
    /*
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    return await response.json();
    */
    
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockWeatherData(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    // For demo purposes, using mock data
    // In production, uncomment the fetch call below
    
    /*
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    return await response.json();
    */
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockWeatherData('Your Location');
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (city: string): Promise<ForecastResponse> => {
  try {
    // For demo purposes, using mock data
    // In production, uncomment the fetch call below
    
    /*
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    return await response.json();
    */
    
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateMockForecastData();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};