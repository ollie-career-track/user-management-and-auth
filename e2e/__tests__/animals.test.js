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

  it.only('posts an animal for this user', () => {
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

  it('updates an animal for a user', () => {});

  it('deletes an animal from a user', () => {});

  it('gets a list of animals any user can access', () => {});
});
