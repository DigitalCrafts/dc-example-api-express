const { Unauthorized } = require('http-errors');

/**
 * @typedef {function} routeHandler
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next express next function
 */

/**
 * Handle errors with Pretty Error
 * @param  {...'User'|'Admin'} roles roles
 * @returns {routeHandler} express middleware
 */
function hasRole(...roles) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Unauthorized('You are not authorized to perform this action');
      }
      const hasCorrectRole = roles.some(
        (role) => req.user.role.toLowerCase() === role.toLowerCase(),
      );
      if (!hasCorrectRole) {
        throw new Unauthorized('You do not have the required role');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasRole;
