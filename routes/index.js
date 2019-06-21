const express = require('express');
const router = express.Router();
const service = require('../src/WikiScraper');
const store = require('../db/GraphDb');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

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
  res.json(await service.fullGraph())
});

module.exports = router;
