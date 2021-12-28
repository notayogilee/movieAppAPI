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
  max: 100
});
app.use(limiter);
app.set('trust proxy', 1);

const routes = require('./routes/movies');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`.inverse.green);
});

