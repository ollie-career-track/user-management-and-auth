/* eslint-disable new-cap */
const router = require('express').Router();
const Comic = require('../models/comic');

router
  .get('/', (req, res, next) => {
    Comic.find()
      .lean()
      .then(comics => {
        res.json(comics);
      })
      .catch(next);
  });

module.exports = router;

// GET by authorized user
// POST PUT DELETE only by admin role