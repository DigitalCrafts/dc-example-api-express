const { body } = require('express-validator');
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

  const parent = await db.Category.findByPk(req.body.parentId);

  const category = await db.Category.create(newCategoryValues);

  if (parent) {
    category.setParent(parent);
  }

  res.status(201).json(category);
}

addCategory.validate = [
  body('name')
    .notEmpty()
    .withMessage('field is required')
    .isLength({ max: 255 })
    .withMessage('must be less than 255 characters')
    .trim()
    .escape(),
  body('parentId')
    .notEmpty()
    .withMessage('field is required')
    .isInt({ gt: 0 })
    .withMessage('must be a positive integer')
    .toInt(),
  body('enabled')
    .optional()
    .isBoolean()
    .withMessage('must be true or false')
    .trim()
    .escape(),
  validate,
];

module.exports = addCategory;
