const express = require('express');
const router = express.Router();
const graphRepo = require('../repository');


router.get('/', async (req, res, next) => {
  let sortedByDegrees = await graphRepo.getPagesDegrees(10);
  res.render('index', {
    nodes: sortedByDegrees,
    layout: false
  });
});

router.get('/graph', (req, res, next) => {
  let limit = req.query.limit ? req.query.limit : '';
  let initialId = req.query.id ? req.query.id : null;
  res.render('graph', {
    limit,
    initialId,
    layout: false
  });
});

router.get('/node', (req, res, next) => {
  let initialUrl = req.query.link ? req.query.link : null;
  let limit = req.query.limit ? req.query.limit : 500;
  res.render('node', {
    title: 'Express',
    url: initialUrl,
    limit
  });
});

module.exports = router;
