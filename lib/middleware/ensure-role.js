const tokenService = require('../token-service');

module.exports = () => (req, res, next) => {
  const token = req.get('Authorization');
  tokenService.verify(token)
    .then(payload => {
      req.user = payload.roles;
      next();
    })
    .catch(() => {
      next({
        statusCode: 401,
        error: 'User is not an admin'
      });
    });
};

// check if payload.roles includes admin...