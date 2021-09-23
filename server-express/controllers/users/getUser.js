const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get user by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getUser(req, res, next) {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      throw new NotFound('User not found');
    }
    if (
      (await req.user.getRole()).name !== 'Admin' &&
      req.user.id !== user.id
    ) {
      // if the user is not an admin and the current user's id is not the same
      // as the id in the url then we don't want to reveal that there is a user
      // with that id so we just throw a 404 error
      throw new NotFound('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

getUser.validate = [
  param('id').isInt().withMessage('id must be an integer'),
  validate,
];

module.exports = getUser;
