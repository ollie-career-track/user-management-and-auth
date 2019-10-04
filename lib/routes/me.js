/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');

router
  .put('/favorites/:animalId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.animalId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

  
  // .get('/favorites', ({ user }, res, next) => {
  //   User.findById(user.id)
  //     .populate('favorites', 'name')
  //     .lean()
  //     .then(({ favorites }) => res.json(favorites))
  //     .catch(next);
  // });

// GET /api/me/favorites

// PUT /api/me/favorites/<favorite id>

// DELETE /api/me/favorites/<favorite id>

module.exports = router;