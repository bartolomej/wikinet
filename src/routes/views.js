const express = require('express');
const router = express.Router();
const GraphDb = require('../db/graph');
const GraphService = require('../services/graph');

router.get('/', async (req, res, next) => {
  let nodes = await GraphService.getHighlyConnected();
  res.render('index', {nodes});
});

router.get('/graph/2d', (req, res, next) => {
  let renderTime = Number.parseInt(req.query.limit) * 10;
  let link = req.query.link;
  let limit = req.query.limit;
  res.render('2d-graph', {
    renderTime,
    link,
    limit
  });
});

router.get('/node', (req, res, next) => {
  res.render('node', { title: 'Express' });
});

module.exports = router;
