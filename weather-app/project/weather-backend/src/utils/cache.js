const NodeCache = require('node-cache');
const ttl = parseInt(process.env.CACHE_TTL_SECONDS || '600', 10);
const cache = new NodeCache({ stdTTL: ttl, checkperiod: Math.ceil(ttl / 2) });

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value, ttlOverride) {
  if (ttlOverride) return cache.set(key, value, ttlOverride);
  return cache.set(key, value);
}

module.exports = { getCache, setCache };
