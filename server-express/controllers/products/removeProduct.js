const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Remove Product by id
 * @param {import('express').Request} req request object
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function removeProduct(req, res, next) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    next(new NotFound('Product not found'));
    return;
  }
  await product.destroy();
  res.status(204).json();
}

removeProduct.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = removeProduct;
