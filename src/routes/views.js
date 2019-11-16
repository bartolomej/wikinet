const express = require('express');
const router = express.Router();
const GraphService = require('../services/graph');

router.get('/', async (req, res, next) => {
  let nodes = await GraphService.getHighlyConnected();
  res.render('index', { nodes });
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
