const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors');

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`.inverse.green);
});

