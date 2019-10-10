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
  })

  .delete('/:id', ensureRole('admin'), ({ params }, res, next) => {
    Comic.findByIdAndRemove({
      _id: params.id
    })
      .then(comic => res.json(comic))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Comic.find()
      .lean()
      .then(comics => {
        res.json(comics);
      })
      .catch(next);
  });

module.exports = router;