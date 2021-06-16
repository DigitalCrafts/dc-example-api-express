const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get Products
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 */
async function addProduct(req, res) {
  // get only valid properties from Product model
  const newProductValues = {};
  Object.keys(db.Product.rawAttributes).forEach((propName) => {
    if (req.body[propName] !== null || req.body[propName] !== undefined) {
      newProductValues[propName] = req.body[propName];
    }
  });

  const product = await db.Product.create(newProductValues);
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
