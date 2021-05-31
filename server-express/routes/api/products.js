const express = require('express');

//controllers
const getProducts = require('../../controllers/products/getProducts');
const addProduct = require('../../controllers/products/addProduct');

// create router
const router = express.Router();

/**
 * GET /api/v1/products
 * @summary Get all products
 * @tags Products
 * @return {array<Product>} 200 - success response - application/json
 */
router.get('/', getProducts);

/**
 * @typedef {object} CreateProductDto
 * @property {string} name.required - name of product
 * @property {string} image - path to image url
 * @property {string} description - description of product
 * @property {integer} price - price in USD cents (e.g. 1000 = US$1.00)
 * @property {integer} quantity - quantity of product in stock
 * @property {integer} CategoryId - id of category to place product in
 * @property {string} publishedAt - date to publish product, set in future to schedule product visibility - date-time
 */

/**
 * POST /api/v1/products
 * @summary Get all products
 * @tags Products
 * @param {CreateProductDto} request.body.required
 * @return {Product} 201 - Success Response - application/json
 * @return {ValidationErrorResponse} 400 - Invalid Response - application/json
 */
router.post('/', addProduct.validate, addProduct);

module.exports = router;
