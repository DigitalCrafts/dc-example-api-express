const { param } = require('express-validator');
const NotFoundError = require('../../errors/notFoundError');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Remove Category by id
 * @param {import('express').Request} req request object
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function removeCategory(req, res, next) {
  const { id } = req.params;
  const category = await db.Category.findByPk(id);
  if (!category) {
    next(new NotFoundError('Category not found'));
    return;
  }
  await category.destroy();
  res.status(204).json();
}

removeCategory.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = removeCategory;
