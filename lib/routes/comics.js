/* eslint-disable new-cap */
const router = require('express').Router();
const Comic = require('../models/comic');
const ensureRole = require('../middleware/ensure-role');

router
  .post('/', ensureRole('admin'), (req, res, next) => {
    Comic.create(req.body)
      .then(comic => res.json(comic))
      .catch(next);
  })

  .put('/:id', ensureRole('admin'), ({ params, body }, res, next) => {
    Comic.updateOne({
      _id: params.id
    }, body)
      .then(comic => res.json(comic))
      .catch(next);
  });

module.exports = router;

// GET by authorized user

// PUT DELETE only by admin role
// ensureRole('role')

// .get('/', (req, res, next) => {
//   Comic.find()
//     .lean()
//     .then(comics => {
//       res.json(comics);
//     })
//     .catch(next);
// })