const request = require('../request');
const User = require('../../lib/models/user');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');

describe('Admin API', () => {
  beforeEach(() => dropCollection('users'));

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

  const newAdmin = {
    email: 'admin@admin.com',
    password: 'admin'
  };

  let user = null;
  beforeEach(() => {
    return signupUser(newAdmin).then(newUser => (user = newUser));
  });

  it('allows an admin to add a role to a user', () => {
    return request
      .put(`/api/auth/users/${user._id}/roles/${'admin'}`)
      .set('Authorization', admin.token)
      .expect(200)
      .then(({ body }) => {
        expect(body.roles[0]).toBe('admin');
      });
  });

  it('allows an admin to delete a role from a user', () => {
    return request
      .delete(`/api/auth/users/${user._id}/roles/${'admin'}`)
      .set('Authorization', admin.token)
      .expect(200);
  });

  it.skip('allows an admin to get the ids, emails, and roles of all users', () => {
    return request
      .get('/api/auth/users')
      .set('Authorization', admin.token)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },

        );
      });
  });
});