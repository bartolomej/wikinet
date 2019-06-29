const express = require('express');
const router = express.Router();
const GraphDb = require('../src/db/GraphDb');
const GraphService = require('../src/services/GraphService');

router.get('/', async (req, res, next) => {
  let nodes = await GraphService.getHighlyConnected();
  res.render('index', {nodes});
});

router.get('/demo', (req, res, next) => {
  res.render('demo', { title: 'Express' });
});

router.get('/graph', (req, res, next) => {
  let renderTime = req.query.render_time;
  let link = req.query.link;
  let limit = req.query.limit;
  res.render('graph', {
    renderTime,
    link,
    limit
  });
});

router.get('/node', (req, res, next) => {
  res.render('node', { title: 'Express' });
});

module.exports = router;
