const express = require('express');
const router = express.Router();
const GraphDb = require('../db/graph');

router.get('/', async (req, res, next) => {
  let nodes = [], stats = {}, error = null;
  try {
    nodes = await GraphDb.getHighlyScrapedNodes();
    stats = await GraphDb.getCount();
  } catch (e) {
    if (/ER_USER_LIMIT_REACHED/.test(e.message)) {
      error = `Database questions limit reached ☹. Come back in a while.️`
    } else {
      error = `Unknown error occurred !`
    }
  }
  res.render('index', { nodes, stats, error });
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
