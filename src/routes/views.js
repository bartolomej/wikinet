const express = require('express');
const router = express.Router();
const GraphDb = require('../db/graph');

router.get('/', async (req, res, next) => {
  let nodes = await GraphDb.getHighlyScrapedNodes();
  let stats = await GraphDb.getCount();
  res.render('index', { nodes, stats });
});

router.get('/add', async (req, res, next) => {
  res.render('add');
});

router.get('/graph', (req, res, next) => {
  // TODO: dynamic render time based on number of nodes
  let link = req.query.link;
  let limit = req.query.limit;
  res.render('graph', { link, limit });
});

module.exports = router;
