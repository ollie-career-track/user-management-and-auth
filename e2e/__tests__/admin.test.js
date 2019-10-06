const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');

describe('Admin API', () => {
  beforeEach(() => dropCollection('users'));

  const testUser = {
    email: 'tester@tester.com',
    password: '123test'
  };

  let user = null;

  beforeEach(() => {
    return signupUser(testUser)
      .then(newUser => user = newUser);
  });

  it('allows an admin to add a role to a user', () => {

  });

  it('allows an admin to delete a role from a user', () => {

  });

  it('allows an admin to get the ids, emails, and roles of all users', () => {

  });
});