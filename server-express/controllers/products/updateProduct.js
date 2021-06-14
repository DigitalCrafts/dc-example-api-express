const { body, param } = require('express-validator');
const db = require('../../models');
const validate = require('../../middleware/validate');
const NotFoundError = require('../../errors/notFoundError');

/**
 * Update Products
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateProduct(req, res, next) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);

  // get only valid properties from Product model
  let updatedValues = {};
  for (let property in db.Product.rawAttributes) {
    if (req.body[propName] !== null || req.body[propName] !== undefined) {
      updatedValues[property] = req.body[property];
    }
  }

  if (!product) {
    next(new NotFoundError('Product not found'));
    return;
  }

  await product.update(updatedValues);
  res.status(200).json(product);
}

updateProduct.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  body('name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('image').optional().isLength({ max: 255 }).trim().escape(),
  body('description').optional().trim().escape(),
  body('price').optional().isInt().withMessage('must be an integer').toInt(),
  body('quantity').optional().isInt().withMessage('must be an integer').toInt(),
  body('CategoryId')
    .optional()
    .isInt()
    .withMessage('must be an integer')
    .toInt(),
  body('publishedAt')
    .optional()
    .isDate()
    .withMessage('must be a valid date')
    .toDate(),
  validate,
];

module.exports = updateProduct;
