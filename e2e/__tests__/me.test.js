const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Me API', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('animals'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const animal = {
    name: 'dog',
    hasTail: true
  };

  function postAnimal(animal) {
    return request
      .post('/api/animals')
      .set('Authorization', user.token)
      .send(animal)
      .expect(200)
      .then(({ body }) => body);
  }

  function putAnimal(animal) {
    return request
      .put(`/api/me/favorites/${animal._id}`)
      .set('Authorization', user.token)
      .send(user)
      .expect(200)
      .then(({ body }) => body);
  }

  it.skip('updates user favorites with an animal', () => {
    return postAnimal(animal)
      .then(animal => {
        return request
          .put(`/api/me/favorites/${animal._id}`)
          .set('Authorization', user.token)
          .send(user)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body).toMatchInlineSnapshot(`
          Array [
            "5d97d1402b3bdb1ed0f2466f",
          ]
        `);
      });
  });

  it.skip('gets a user favorites list', () => {
    
  });

  it.only('removes an animal from user favorites', () => {
    return postAnimal(animal)
      .then(animal => {
        return putAnimal(animal);
      })
      .then(animal => {
        return request
          .delete(`/api/me/favorites/${animal._id}`)
          .set('Authorization', user.token)
          .expect(200);
      });
  });
});
