const express = require('express');
const router = express.Router();
const scrapeService = require('../scrapeService');
const graphRepo = require('../repository');


router.get('/page', async (req, res, next) => {
  //res.json(await store.getAllNodes(req.query.limit));
});

router.get('/page/:uid', async (req, res, next) => {
  try {
    res.json(await store.getNode(req.params.uid));
  } catch (e) { next(e) }
});

router.get('/graph', async (req, res, next) => {
  try {
    res.json(await graphRepo.getGraph(
      req.query.limit !== undefined ? req.query.limit : 300
    ))
  } catch (e) { next(e) }
});

module.exports = router;
