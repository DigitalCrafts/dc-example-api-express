const db = require('../../models');

/**
 * Get all orders
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 */
async function getOrders(req, res) {
  res.json(await db.Order.findAll());
}

module.exports = getOrders;
