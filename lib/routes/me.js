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

// GET /api/me/favorites
// DELETE /api/me/favorites/<favorite id>

module.exports = router;