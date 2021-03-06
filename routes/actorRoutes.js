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

// get popular actors
router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/person/${search}?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

// get single actor by id 
router.get('/:id', cache('2 minutes'), async (req, res) => {
  try {
    const id = req.params.id;

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/person/${id}?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

// get actor movie credits
router.get('/:id/movies', cache('2 minutes'), async (req, res) => {
  try {
    const id = req.params.id;

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/person/${id}/movie_credits?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

// get actor tv show credits
router.get('/:id/shows', cache('2 minutes'), async (req, res) => {
  try {
    const id = req.params.id;

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/person/${id}/tv_credits?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

// get actor images
router.get('/:id/images', cache('2 minutes'), async (req, res) => {
  try {
    const id = req.params.id;

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    });

    const apiRes = await needle('get', `${API_BASE_URL}/person/${id}/images?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;