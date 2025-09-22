const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast, getHistory } = require('../controllers/weatherController');
const { validateCityQuery } = require('../middlewares/validateCity');

// GET /api/weather?city=CityName
router.get('/', validateCityQuery, getCurrentWeather);

// GET /api/weather/forecast?city=CityName
router.get('/forecast', validateCityQuery, getForecast);

// Optional: GET /api/weather/history
router.get('/history', getHistory);

module.exports = router;
