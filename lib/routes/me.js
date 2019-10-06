/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites/:userId', ({ user }, res, next) => {
    User.findById(user.id)
      .populate()
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:animalId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.animalId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .delete('/favorites/:animalId', ({ params, user }, res, next) => {
    User.findOneAndRemove(user.id, {
      $pull: {
        favorites: params.animalId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

module.exports = router;