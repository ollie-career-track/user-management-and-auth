/* eslint-disable new-cap */
const router = require('express').Router();
const Animal = require('../models/animal');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;
    Animal.create(req.body)
      .then(animal => res.json(animal))
      .catch(next);
  })

  .put('/:id', ({ params, body, user }, res, next) => {
    Animal.updateOne({
      _id: params.id,
      owner: user.id
    }, body)
      .then(animal => res.json(animal))
      .catch(next);
  })

  .delete('/:id', ({ params, user }, res, next) => {
    Animal.findOneAndRemove({
      _id: params.id,
      owner: user.id
    })
      .then(animal => res.json(animal))
      .catch(next);
  });

// DELETE /api/animals/:id
// delete an animal from the user's favorites array

// GET /api/animals
// get a list of all the animals any user can see

module.exports = router;