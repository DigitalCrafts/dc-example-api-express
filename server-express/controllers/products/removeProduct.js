const { body, param } = require('express-validator');
const db = require('../../models');
const validate = require('../../middleware/validate');
const NotFoundError = require('../../errors/notFoundError');

/**
 * Remove Product by id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function removeProduct(req, res, next) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    next(new NotFoundError('Product not found'));
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
