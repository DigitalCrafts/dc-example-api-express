const express = require('express');
const getProducts = require('../../controllers/products/getProducts');
const router = express.Router();

/**
 * GET /api/v1/products
 * @summary Get all products
 * @tags Products
 * @return {array<Product>} 200 - success response - application/json
 */
router.get('/', getProducts);

module.exports = router;
