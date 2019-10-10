const request = require('../request');
const User = require('../../lib/models/user');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Comic API', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('comics'));

  const admin = {
    email: 'boot@boot.com',
    password: 'boot'
  };

  beforeEach(() => {
    return signupUser(admin)
      .then(admin => {
        return User.addRole(admin._id, 'admin');
      })
      .then(() => {
        return request
          .post('/api/auth/signin')
          .send(admin)
          .expect(200);
      })
      .then(res => {
        admin.token = res.body.token;
      });
  });

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const comic = {
    title: 'comic',
    author: 'comic author'
  };

  function postComic(comic) {
    return request
      .post('/api/comics')
      .set('Authorization', admin.token)
      .send(comic)
      .expect(200)
      .then(({ body }) => body);
  }

  it('gets a list of comics for any authorized user', () => {
    return Promise.all([
      postComic(comic),
      postComic({ title: 'comic 2', author: 'random author' }),
      postComic({ title: 'comic 3', author: 'random author' })
    ])
      .then(() => {
        return request
          .get('/api/comics')
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "author": "comic author",
            "chapters": 1,
            "genre": Array [],
            "ongoing": true,
            "title": "comic",
          }
        `
        );
      });
  });

  it('only allows admins to post a comic', () => {
    return request
      .post('/api/comics')
      .set('Authorization', admin.token)
      .send(comic)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "author": "comic author",
            "chapters": 1,
            "genre": Array [],
            "ongoing": true,
            "title": "comic",
          }
        `
        );
      });
  });

  it('only allows admins to update a comic', () => {
    return postComic(comic)
      .then(comic => {
        comic.title = 'this is a better title';
        return request
          .put(`/api/comics/${comic._id}`)
          .set('Authorization', admin.token)
          .send(comic)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.title).toBe('this is a better title');
      });
  });

  it('only allows admins to delete a comic', () => {
    return postComic(comic).then(comic => {
      return request
        .delete(`/api/comics/${comic._id}`)
        .set('Authorization', admin.token)
        .expect(200);
    });
  });
});
