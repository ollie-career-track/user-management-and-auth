/* eslint-disable new-cap */
const router = require('express').Router();
const Comic = require('../models/comic');
// const ensureRole = require('./middleware/ensure-role');

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
// ensureRole('role')