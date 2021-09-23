const { body } = require('express-validator');
const { Conflict } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get product by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function registerUser(req, res, next) {
  const { email, password, name } = req.body;
  try {
    const existingUser = await db.User.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Conflict('Email already in use');
    }
    const userRole = await db.Role.findOne({ where: { name: 'User' } });
    const user = await db.User.create({
      name,
      email,
      password,
      RoleId: userRole.id,
    });
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
}

registerUser.validate = [
  body('email').isEmail().withMessage('Invalid email').trim().escape(),
  body('password')
    .isStrongPassword()
    .withMessage('Password does not meet requirements')
    .trim()
    .escape(),
  validate,
];

module.exports = registerUser;
