const { param } = require('express-validator');
const NotFoundError = require('../../errors/notFoundError');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get category by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getCategoryProducts(req, res, next) {
  const category = await db.Category.findByPk(req.params.id);

  if (!category) {
    next(new NotFoundError('Category not found'));
    return;
  }

  const products = await category.getProducts();
  res.json(products);
}

getCategoryProducts.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = getCategoryProducts;
