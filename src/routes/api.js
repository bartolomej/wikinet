const express = require('express');
const router = express.Router();
const ScrapeService = require('../services/scrape');
const GraphService = require('../services/graph');
const store = require('../db/graph');

router.get('/page', async (req, res, next) => {
  res.json(await store.getAllPages(req.query.limit));
});

router.get('/node', async (req, res, next) => {
  res.json(await store.getAllNodes(req.query.limit));
});

router.get('/node/:uid', async (req, res, next) => {
  res.json(await store.getNode(req.params.uid));
});

router.get('/graph', async (req, res, next) => {
  res.json(await GraphService.twoDegreeGraph(
    req.query.node !== undefined ? req.query.node : null,
    req.query.limit !== undefined ? req.query.limit : 300
  ))
});

router.get('/rich', async (req, res, next) => {
  res.json(await GraphService.getHighlyConnected(req.query.node, req.query.limit))
});

router.post('/schedule', async (req, res, next) => {
  ScrapeService.scheduleScrape(req.body.url);
  res.json({ message: 'Link added' });
});

module.exports = router;
