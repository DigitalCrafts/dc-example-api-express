const { body } = require('express-validator');
const { Unauthorized, NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get product by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next middleware
 */
async function authenticateUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFound('User not found');
    }
    if (!user.validPassword(password)) {
      throw new Unauthorized('Invalid password');
    }
    const token = user.generateToken();
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

authenticateUser.validate = [
  body('email').isEmail().trim().escape(),
  body('password').trim().escape(),
  validate,
];

module.exports = authenticateUser;
