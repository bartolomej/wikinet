const express = require('express');
const router = express.Router();
const scrapeService = require('../scrapeService');
const graphRepo = require('../repository');


router.post('/query', async (req, res, next) => {
  try {
    res.json(await graphRepo.getByCustomQuery(
      req.body.query
    ));
  } catch (e) { next(e) }
});

router.get('/page', async (req, res, next) => {
  try {
    res.json(await graphRepo.getPages(
      req.query.limit ? req.query.limit : 100
    ));
  } catch (e) { next(e) }
});

router.get('/page/degree', async (req, res, next) => {
  let limit = req.query.limit;
  let asc = req.query.ascending ? true : false;
  try {
    res.json(await graphRepo.getPagesDegrees(limit, asc))
  } catch (e) { next(e) }
});

router.get('/page/:uid', async (req, res, next) => {
  try {
    res.json(await graphRepo.getPage(req.params.uid));
  } catch (e) { next(e) }
});

router.get('/page/:uid/neighbors', async (req, res, next) => {
  try {
    res.json(await graphRepo.getPageNeighbors(
      req.params.uid,
      req.query.limit ? req.query.limit : undefined
    ));
  } catch (e) { next(e) }
});

router.get('/graph', async (req, res, next) => {
  try {
    res.json(await graphRepo.getGraph(
      req.query.limit ? req.query.limit : 10000,
      req.query.url ? req.query.url : undefined
    ))
  } catch (e) { next(e) }
});

router.get('/graph/:fromId', async (req, res, next) => {
  try {
    res.json(await graphRepo.getGraph(
      req.query.limit ? req.query.limit : 300,
      req.params.fromId
    ))
  } catch (e) { next(e) }
});

router.get('/info', async (req, res, next) => {
  try {
    res.json(await graphRepo.getDataInfo());
  } catch (e) { next(e) }
});

module.exports = router;
