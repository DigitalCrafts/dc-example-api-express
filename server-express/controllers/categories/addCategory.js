const { body, param } = require('express-validator');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get Categories
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 */
async function addCategory(req, res) {
  // get only valid properties from Category model
  const newCategoryValues = {};
  Object.keys(db.Category.rawAttributes).forEach((propName) => {
    if (req.body[propName] !== null || req.body[propName] !== undefined) {
      newCategoryValues[propName] = req.body[propName];
    }
  });

  const category = await db.Category.create(newCategoryValues);
  res.status(201).json(category);
}

addCategory.validate = [
  param('id').isNumeric().withMessage('id must be an integer'),
  body('name')
    .notEmpty()
    .withMessage('field is required')
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('enabled')
    .isBoolean()
    .withMessage('must be true or false')
    .trim()
    .escape(),
  validate,
];

module.exports = addCategory;
