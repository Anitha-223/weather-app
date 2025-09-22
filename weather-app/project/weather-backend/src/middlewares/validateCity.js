function validateCityQuery(req, res, next) {
  const city = (req.query.city || '').trim();
  if (!city) {
    return res.status(400).json({ error: 'Missing required query param: city' });
  }
  if (city.length > 100) {
    return res.status(400).json({ error: 'City name too long' });
  }
  // basic safety: allow letters, spaces, commas, hyphen, dot
  const allowed = /^[a-zA-Z\s,.'-]+$/;
  if (!allowed.test(city)) {
    // Not strictly required — adjust to your needs
    return res.status(400).json({ error: 'City name contains invalid characters' });
  }
  req.city = city;
  next();
}

module.exports = { validateCityQuery };
