const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
  // TODO: return highly connected nodes
  // let nodes = await GraphService.getHighlyConnected();
  res.render('index', {nodes});
});

router.get('/demo', (req, res, next) => {
  res.render('demo', { title: 'Express' });
});

router.get('/graph/2d', (req, res, next) => {
  let renderTime = req.query.render_time;
  let link = req.query.link;
  let limit = req.query.limit;
  res.render('2d-graph', {
    renderTime,
    link,
    limit
  });
});

router.get('/graph/3d', (req, res, next) => {
  let renderTime = req.query.render_time;
  let link = req.query.link;
  let limit = req.query.limit;
  res.render('3d-graph', {
    link,
    limit
  });
});

router.get('/node', (req, res, next) => {
  res.render('node', { title: 'Express' });
});

module.exports = router;
