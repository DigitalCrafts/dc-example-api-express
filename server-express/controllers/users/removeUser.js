const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Remove User by id
 * @param {import('express').Request} req request object
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function removeUser(req, res, next) {
  const { id } = req.params;
  const product = await db.User.findByPk(id);
  if (!product) {
    next(new NotFound('User not found'));
    return;
  }
  await product.destroy();
  res.status(204).json();
}

removeUser.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = removeUser;
