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
 * @returns {array<Category>} 200 - success response - application/json
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
 * @param {CreateCategoryDto} request.body.required
 * @returns {Category} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 */
router.post('/', hasRole('Admin'), addCategory.validate, addCategory);

/**
 * GET /api/v1/categories/{id}
 * @summary Get single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @returns {Category} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @return {ErrorResponse} 404 - Not Found Response
 */
router.get('/:id', getCategory.validate, getCategory);

/**
 * GET /api/v1/categories/{id}/children
 * @summary Get single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @returns {Category} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @return {ErrorResponse} 404 - Not Found Response - application/json
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
 * @param {number} id.path.required
 * @param {UpdateCategoryDto} request.body.required
 * @return {Category} 200 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @return {ErrorResponse} 404 - Not Found Response - application/json
 */
router.put('/:id', updateCategory.validate, updateCategory);

/**
 * DELETE /api/v1/categories/{id}
 * @summary Delete a single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @return 204 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 */
router.delete('/:id', removeCategory.validate, removeCategory);

/**
 * GET /api/v1/categories/{id}/products
 * @summary Get all products for a category
 * @tags Categories
 * @param {number} id.path.required
 * @returns {array<Product>} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @return {ErrorResponse} 404 - Not Found Response - application/json
 */
router.get('/:id/products', getCategoryProducts.validate, getCategoryProducts);

module.exports = router;
