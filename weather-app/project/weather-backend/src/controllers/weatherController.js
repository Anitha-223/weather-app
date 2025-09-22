const { fetchCurrent, fetchForecast, normalizeCurrent, aggregateForecast } = require('../services/openWeatherService');
const { getCache, setCache } = require('../utils/cache');
let SearchHistory;
try {
  // optional import if mongoose connected
  SearchHistory = require('../models/SearchHistory');
} catch (err) {
  SearchHistory = null;
}

async function getCurrentWeather(req, res, next) {
  try {
    const city = req.city;
    const cacheKey = `current:${city.toLowerCase()}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ cached: true, ...cached });
    }

    const raw = await fetchCurrent(city);
    const normalized = normalizeCurrent(raw);
    setCache(cacheKey, normalized);

    // optionally save a short summary in history
    if (SearchHistory) {
      try {
        await SearchHistory.create({
          city: normalized.city,
          country: normalized.country,
          searchedAt: new Date(),
          summary: {
            temp: normalized.temp,
            description: normalized.description
          },
          raw: normalized.raw
        });
      } catch (e) {
        console.warn('Could not save search history:', e.message);
      }
    }

    res.json({ cached: false, ...normalized });
  } catch (err) {
    // enhance error message if provider returns 404
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    next(err);
  }
}

async function getForecast(req, res, next) {
  try {
    const city = req.city;
    const cacheKey = `forecast:${city.toLowerCase()}`;

    const cached = getCache(cacheKey);
    if (cached) return res.json({ cached: true, ...cached });

    const raw = await fetchForecast(city);
    const aggregated = aggregateForecast(raw);
    setCache(cacheKey, aggregated);

    res.json({ cached: false, ...aggregated });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    next(err);
  }
}

async function getHistory(req, res, next) {
  if (!SearchHistory) return res.status(501).json({ error: 'History not enabled (no DB connection)' });
  try {
    const items = await SearchHistory.find().sort({ searchedAt: -1 }).limit(50).lean();
    res.json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCurrentWeather, getForecast, getHistory };
