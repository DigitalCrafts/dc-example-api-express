const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get product by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getProduct(req, res, next) {
  const product = await db.Product.findByPk();
  if (!product) {
    next(new NotFound('Product not found'));
    return;
  }
  res.json(product);
}

getProduct.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  validate,
];

module.exports = getProduct;
