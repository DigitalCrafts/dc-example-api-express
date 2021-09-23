const db = require('../../models');

/**
 * Get product by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getUsers(req, res, next) {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = getUsers;
