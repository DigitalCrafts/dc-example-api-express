const { body } = require('express-validator');
const db = require('../../models');
const validate = require('../../middleware/validate');

/**
 * Get Products
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addProduct(req, res, next) {
  console.log(req.body);
  const product = await db.Product.create(req.body);
  res.status(201).json(product);
}

addProduct.validate = [
  body('name')
    .notEmpty()
    .withMessage('field is required')
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('image').isLength({ max: 255 }).trim().escape(),
  body('description').trim().escape(),
  body('price').isInt().withMessage('must be an integer').toInt(),
  body('quantity').isInt().withMessage('must be an integer').toInt(),
  body('CategoryId').isInt().withMessage('must be an integer').toInt(),
  body('publishedAt').isDate().withMessage('must be a valid date').toDate(),
  validate,
];

module.exports = addProduct;
