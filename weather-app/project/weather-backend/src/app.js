const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const weatherRoutes = require('./routes/weather');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors()); // configure origin in production
app.use(express.json());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', apiLimiter);

app.use('/api/weather', weatherRoutes);

// health check
app.get('/ping', (req, res) => res.json({ ok: true }));

// global error handler
app.use(errorHandler);

module.exports = app;
