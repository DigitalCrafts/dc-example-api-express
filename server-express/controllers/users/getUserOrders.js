const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Get order by id
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function getUserOrders(req, res, next) {
  try {
    if (
      (await req.user.getRole()).name !== 'Admin' &&
      req.user.id !== req.params.id
    ) {
      // if the user is not an admin and the current user's id is not the same
      // as the id in the url then we don't want to reveal that there is an order
      // with that id so we just return an empty array
      res.json([]);
      return;
    }
    const orders = await db.Order.findAll({
      where: { UserId: req.params.id },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

getUserOrders.validate = [
  param('id').isUUID().withMessage('uuid must be valid'),
  validate,
];

module.exports = getUserOrders;
