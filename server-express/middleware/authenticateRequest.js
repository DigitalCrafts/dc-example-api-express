const jwt = require('jsonwebtoken');
const db = require('../models');

/**
 * Find a user by id
 * @param {number} id the id of the user to find
 * @returns {Promise<typeof import('sequelize').Model>} the user with the given id
 */
function findUser(id) {
  return db.User.findByPk(id, {
    include: [db.Role],
  });
}

/**
 * Authenticate request by checking for a valid JWT token or session
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next express next function
 */
async function authenticateRequest(req, res, next) {
  if (req.session?.user) {
    // check for a session and a user on that session
    req.user = await findUser(req.session.user.id);
    req.user.role = req.user.Role.name;
    next();
  } else if (req.headers.authorization) {
    // check for a valid JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findUser(decoded.id);
    if (req.user) {
      req.user.role = req.user.Role.name;
    }
    next();
  } else {
    // assume unauthenticated
    req.user = null;
    next();
  }
}

module.exports = authenticateRequest;
