const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit').default;
const colors = require('colors');

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000
});
app.use(limiter);
app.set('trust proxy', 1);

const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');
const actorRoutes = require('./routes/actorRoutes');

app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/actors', actorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`.inverse.green);
});

