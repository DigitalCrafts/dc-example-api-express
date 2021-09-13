const { body, param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Update Products
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next next function
 */
async function updateProduct(req, res, next) {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);

  // get only valid properties from Product model
  const updatedValues = {};
  Object.keys(db.Product.rawAttributes).forEach((propName) => {
    if (req.body[propName] !== null || req.body[propName] !== undefined) {
      updatedValues[propName] = req.body[propName];
    }
  });

  if (!product) {
    next(new NotFound('Product not found'));
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
