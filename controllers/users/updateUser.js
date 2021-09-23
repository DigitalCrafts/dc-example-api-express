const { body, param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Update User
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next next function
 */
async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      next(new NotFound('User not found'));
      return;
    }
    if (
      (await req.user.getRole().name) !== 'Admin' &&
      req.user.id !== user.id
    ) {
      // if the user is not an admin and the current user's id is not the same
      // as the id in the url then we don't want to reveal that there is a user
      // with that id so we just throw a 404 error
      throw new NotFound('User not found');
    }

    // get only valid properties from User model
    const updatedValues = {};
    Object.keys(db.User.rawAttributes).forEach((propName) => {
      if (req.body[propName] !== null || req.body[propName] !== undefined) {
        updatedValues[propName] = req.body[propName];
      }
    });

    await user.update(updatedValues);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

updateUser.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  body('name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('email').optional().isEmail().trim().escape(),
  body('password').optional().trim().escape(),
  body('role').optional().trim().escape(),
  validate,
];

module.exports = updateUser;
