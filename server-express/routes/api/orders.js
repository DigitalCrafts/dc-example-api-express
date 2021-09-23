const express = require('express');
const createOrder = require('../../controllers/orders/createOrder');
const getOrder = require('../../controllers/orders/getOrder');
const getOrders = require('../../controllers/orders/getOrders');
const hasRole = require('../../middleware/hasRole');

// create router
const router = express.Router();

/**
 * GET /api/v1/orders
 * @summary Get all orders
 * @tags Orders
 * @security Bearer
 * @returns {array<Order>} 200 - success response
 */
router.get('/', hasRole('Admin'), getOrders);

/**
 * @typedef {object} ProductQuantity
 * @property {number} id product id
 * @property {number} quantity quantity of product
 */

/**
 * @typedef {object} CreateOrderRequest
 * @property {string} firstName.required first name for the order
 * @property {string} lastName.required last name for the order
 * @property {string} company company for the order
 * @property {string} address1.required address for the order
 * @property {string} address2 address for the order
 * @property {string} city.required city for the order
 * @property {string} region.required region for the order
 * @property {string} postcode.required postcode for the order
 * @property {string} notes extra notes about the order
 * @property {number} userId id of the user who placed the order (only Admin user can set this, all other users will be set to the current user)
 * @property {array<ProductQuantity>} products.required products and quantity for the order
 */

/**
 * POST /api/v1/orders
 * @summary Add new order
 * @tags Orders
 * @security Bearer
 * @param {CreateOrderRequest} request.body.required
 * @return {Order} 201 - Success Response
 * @return {ValidationErrorResponse} 400 - Invalid Response
 * @return {ErrorResponse} 401 - Unauthorized Response
 */
router.post('/', hasRole('Admin', 'User'), createOrder.validate, createOrder);

/**
 * GET /api/v1/orders/{uuid}
 * @summary Get order by uuid
 * @tags Orders
 * @param {string} uuid.path.required - uuid of the order - uuidv4
 * @security Bearer
 * @returns {array<Order>} 200 - success response
 */
router.get('/:uuid', hasRole('Admin', 'User'), getOrder);

module.exports = router;
