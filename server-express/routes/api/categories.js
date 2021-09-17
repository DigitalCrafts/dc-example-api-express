const express = require('express');
const addCategory = require('../../controllers/categories/addCategory');
const getCategories = require('../../controllers/categories/getCategories');
const getCategory = require('../../controllers/categories/getCategory');
const getCategoryChildren = require('../../controllers/categories/getCategoryChildren');
const getCategoryProducts = require('../../controllers/categories/getCategoryProducts');
const removeCategory = require('../../controllers/categories/removeCategory');
const updateCategory = require('../../controllers/categories/updateCategory');
const hasRole = require('../../middleware/hasRole');

// create router
const router = express.Router();

/**
 * GET /api/v1/categories
 * @summary Get all categories
 * @tags Categories
 * @security
 * @returns {array<Category>} 200 - success response
 */
router.get('/', getCategories);

/**
 * @typedef {object} CreateCategoryDto
 * @property {string} name.required - name of category
 * @property {boolean} enabled - category is publicly enabled
 * @property {number} parentId - id of parent category (optional)
 */

/**
 * POST /api/v1/categories
 * @summary Add new category
 * @tags Categories
 * @security BearerToken
 * @param {CreateCategoryDto} request.body.required
 * @returns {Category} 200 - success response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.post('/', hasRole('Admin'), addCategory.validate, addCategory);

/**
 * GET /api/v1/categories/{id}
 * @summary Get single category by id
 * @tags Categories
 * @security
 * @param {number} id.path.required
 * @returns {Category} 200 - success response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.get('/:id', getCategory.validate, getCategory);

/**
 * GET /api/v1/categories/{id}/children
 * @summary Get single category by id
 * @tags Categories
 * @security
 * @param {number} id.path.required
 * @returns {Category} 200 - success response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 */
router.get('/:id/children', getCategoryChildren.validate, getCategoryChildren);

/**
 * @typedef {object} UpdateCategoryDto
 * @property {string} name - name of category
 * @property {boolean} enabled - category is publicly enabled
 * @property {number} parentId - id of parent category (optional)
 */

/**
 * PUT /api/v1/categories/{id}
 * @summary Update existing category
 * @tags Categories
 * @security BearerToken
 * @param {number} id.path.required
 * @param {UpdateCategoryDto} request.body.required
 * @return {Category} 200 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.put('/:id', hasRole('Admin'), updateCategory.validate, updateCategory);

/**
 * DELETE /api/v1/categories/{id}
 * @summary Delete a single category by id
 * @tags Categories
 * @security BearerToken
 * @param {number} id.path.required
 * @return 204 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.delete(
  '/:id',
  hasRole('Admin'),
  removeCategory.validate,
  removeCategory,
);

/**
 * GET /api/v1/categories/{id}/products
 * @summary Get all products for a category
 * @tags Categories
 * @security
 * @param {number} id.path.required
 * @returns {array<Product>} 200 - success response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.get('/:id/products', getCategoryProducts.validate, getCategoryProducts);

module.exports = router;
