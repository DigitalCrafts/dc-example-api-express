const express = require('express');
const addProduct = require('../../controllers/products/addProduct');
const getProduct = require('../../controllers/products/getProduct');
const getProducts = require('../../controllers/products/getProducts');
const removeProduct = require('../../controllers/products/removeProduct');
const updateProduct = require('../../controllers/products/updateProduct');
const hasRole = require('../../middleware/hasRole');

// create router
const router = express.Router();

/**
 * GET /api/v1/products
 * @summary Get all products
 * @tags Products
 * @security
 * @returns {array<Product>} 200 - success response
 */
router.get('/', getProducts);

/**
 * @typedef {object} CreateProductDto
 * @property {string} name.required - name of product
 * @property {string} image - path to image url
 * @property {string} description - description of product
 * @property {integer} price - price in USD cents (e.g. 1000 = US$1.00)
 * @property {integer} quantity - quantity of product in stock
 * @property {integer} categoryId - id of category to place product in
 * @property {string} publishedAt - date to publish product, set in future to schedule product visibility - date-time
 */

/**
 * POST /api/v1/products
 * @summary Get all products
 * @tags Products
 * @security BearerToken
 * @param {CreateProductDto} request.body.required
 * @return {Product} 201 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.post('/', hasRole('Admin'), addProduct.validate, addProduct);

/**
 * GET /api/v1/products/{id}
 * @summary Get all products
 * @tags Products
 * @security
 * @param {number} id.path.required
 * @return {Product} 201 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 */
router.get('/:id', getProduct.validate, getProduct);

/**
 * @typedef {object} UpdateProductDto
 * @property {string} name - name of product
 * @property {string} image - path to image url
 * @property {string} description - description of product
 * @property {integer} price - price in USD cents (e.g. 1000 = US$1.00)
 * @property {integer} quantity - quantity of product in stock
 * @property {integer} categoryId - id of category to place product in
 * @property {string} publishedAt - date to publish product, set in future to schedule product visibility - date-time
 */

/**
 * PUT /api/v1/products/{id}
 * @summary Update product with specific ID
 * @tags Products
 * @security BearerToken
 * @param {number} id.path.required
 * @param {UpdateProductDto} request.body.required
 * @return {Product} 201 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.put('/:id', hasRole('Admin'), updateProduct.validate, updateProduct);

/**
 * DELETE /api/v1/products/{id}
 * @summary Delete product with specific ID
 * @tags Products
 * @security BearerToken
 * @param {number} id.path.required
 * @return 201 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 404 - Not Found Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.delete('/:id', hasRole('Admin'), removeProduct.validate, removeProduct);

module.exports = router;
