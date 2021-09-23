const { body } = require('express-validator');
const { NotFound, Conflict } = require('http-errors');
const { Op } = require('sequelize');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get Users
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next next middleware function
 */
async function addUser(req, res, next) {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await db.User.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new Conflict('Email already in use');
    }
    // find role from name or id
    const userRole = await db.Role.findOne({
      where: {
        [Op.or]: {
          name: { [Op.iLike]: role },
          id: parseInt(role, 10) || null,
        },
      },
    });
    if (!userRole) {
      throw new NotFound('Role not found');
    }
    const user = await db.User.create({
      name,
      email,
      password,
      RoleId: userRole.id,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

addUser.validate = [
  body('name')
    .notEmpty()
    .withMessage('field is required')
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('email').isEmail().trim().escape(),
  body('password').default('').trim().escape(),
  body('role').default('User').trim().escape(),
  validate,
];

module.exports = addUser;
