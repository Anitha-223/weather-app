const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;
if (!API_KEY) {
  console.warn('Warning: WEATHER_API_KEY not set in .env');
}

const BASE = 'https://api.openweathermap.org/data/2.5';

async function fetchCurrent(city) {
  const url = `${BASE}/weather`;
  const resp = await axios.get(url, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  });
  return resp.data;
}

async function fetchForecast(city) {
  const url = `${BASE}/forecast`; // 5 day / 3 hour
  const resp = await axios.get(url, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  });
  return resp.data; // contains list[] every 3 hours
}

function normalizeCurrent(data) {
  return {
    city: data.name,
    country: data.sys?.country,
    temp: data.main?.temp,
    feels_like: data.main?.feels_like,
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    wind: data.wind,
    visibility: data.visibility,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
    raw: data
  };
}

function aggregateForecast(rawForecast) {
  // rawForecast.list contains 3-hour entries
  const byDate = {};
  rawForecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toISOString().slice(0, 10); // YYYY-MM-DD
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });

  const days = Object.keys(byDate).slice(0, 5).map(date => {
    const entries = byDate[date];
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    const descriptions = {};
    entries.forEach(e => {
      if (e.main.temp_min < min) min = e.main.temp_min;
      if (e.main.temp_max > max) max = e.main.temp_max;
      const d = e.weather?.[0]?.description || 'unknown';
      descriptions[d] = (descriptions[d] || 0) + 1;
    });
    // pick most frequent description
    const desc = Object.keys(descriptions).sort((a, b) => descriptions[b] - descriptions[a])[0];

    return {
      date,
      temp_min: Number(min.toFixed(1)),
      temp_max: Number(max.toFixed(1)),
      description: desc
    };
  });

  return {
    city: rawForecast.city?.name,
    country: rawForecast.city?.country,
    days,
    raw: rawForecast
  };
}

module.exports = {
  fetchCurrent,
  fetchForecast,
  normalizeCurrent,
  aggregateForecast
};
