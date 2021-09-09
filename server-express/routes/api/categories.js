const express = require('express');
const addCategory = require('../../controllers/categories/addCategory');
const getCategories = require('../../controllers/categories/getCategories');
const getCategory = require('../../controllers/categories/getCategory');
const getCategoryChildren = require('../../controllers/categories/getCategoryChildren');
const removeCategory = require('../../controllers/categories/removeCategory');
const updateCategory = require('../../controllers/categories/updateCategory');

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
router.post('/', addCategory.validate, addCategory);

/**
 * GET /api/v1/categories/{id}
 * @summary Get single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @returns {Category} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @example response - 400 - Invalid Response
 * {
 *   "errors": [
 *      {
 *          "value": "example",
 *          "msg": "id must be an integer",
 *          "param": "id",
 *          "location": "params"
 *      }
 *   ]
 * }
 * @return {NotFoundErrorResponse} 404 - Not Found Response
 * @example response - 404 - Not Found response
 * {
 *   "message": "Product Not Found",
 *   "status": 404,
 *   "name": "NotFoundError"
 * }
 */
router.get('/:id', getCategory.validate, getCategory);

/**
 * GET /api/v1/categories/{id}/children
 * @summary Get single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @returns {Category} 200 - success response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 * @return {NotFoundErrorResponse} 404 - Not Found Response - application/json
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
 * @return {NotFoundErrorResponse} 404 - Not Found Response - application/json
 */
router.put('/:id', updateCategory.validate, updateCategory);

/**
 * DELETE /api/v1/categories/{id}
 * @summary Delete a single category by id
 * @tags Categories
 * @param {number} id.path.required
 * @return 204 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {NotFoundErrorResponse} 404 - Not Found Response
 */
router.delete('/:id', removeCategory.validate, removeCategory);

module.exports = router;
