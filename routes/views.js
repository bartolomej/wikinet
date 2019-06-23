const express = require('express');
const router = express.Router();


router.get('/demo', (req, res, next) => {
  res.render('demo', { title: 'Express' });
});

router.get('/graph', (req, res, next) => {
  res.render('graph', { title: 'Express' });
});

router.get('/node', (req, res, next) => {
  res.render('node', { title: 'Express' });
});

module.exports = router;
