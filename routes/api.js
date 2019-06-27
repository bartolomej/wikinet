const express = require('express');
const router = express.Router();
const ScrapeService = require('../src/services/ScrapeService');
const GraphService = require('../src/services/GraphService');
const store = require('../src/db/GraphDb');

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
  res.json(await GraphService.twoDegreeGraph(req.query.node, req.query.limit))
});

module.exports = router;
