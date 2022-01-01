const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

const API_BASE_URL = process.env.TMDB_API_BASE_URL;
const API_KEY_NAME = process.env.TMDB_API_KEY_NAME;
const API_KEY_VALUE = process.env.TMDB_API_KEY_VALUE;
let search = 'popular';

let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/tv/${search}?${params}`);
    const data = apiRes.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}/tv/${search}?${params}`);
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;