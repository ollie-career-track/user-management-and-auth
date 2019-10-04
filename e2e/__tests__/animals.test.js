const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Animals API', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('animals'));

  const testUser = {
    email: 'testy@testy.com',
    password: 'abc123'
  };

  let user = null;
  beforeEach(() => {
    return signupUser(testUser).then(newUser => (user = newUser));
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

  it('posts an animal for this user', () => {
    return request
      .post('/api/animals')
      .set('Authorization', user.token)
      .send(animal)
      .expect(200)
      .then(({ body }) => {
        expect(body.owner).toBe(user._id);
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            owner: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "diet": Array [],
            "hasTail": true,
            "limbs": 5,
            "name": "dog",
            "owner": Any<String>,
          }
        `
        );
      });
  });

  it('updates an animal for a user', () => {
    return postAnimal(animal)
      .then(animal => {
        animal.hasTail = false;
        return request
          .put(`/api/animals/${animal._id}`)
          .set('Authorization', user.token)
          .send(animal)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.owner).toBe(user._id);
        expect(body.hasTail).toBe(false);
      });
  });

  it('deletes an animal from a user', () => {
    return postAnimal(animal).then(animal => {
      return request
        .delete(`/api/animals/${animal._id}`)
        .set('Authorization', user.token)
        .expect(200);
    });
  });

  it('gets a list of animals any user can access', () => {
    const firstAnimal = {
      name: 'dog 1',
      hasTail: true
    };

    return Promise.all([
      postAnimal(firstAnimal),
      postAnimal({ name: 'dog 2', hasTail: true }),
      postAnimal({ name: 'dog 3', hasTail: true })
    ])
      .then(() => {
        return request
          .get('/api/animals')
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            owner: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "diet": Array [],
            "hasTail": true,
            "limbs": 5,
            "name": "dog 1",
            "owner": Any<String>,
          }
        `
        );
      });
  });
});
