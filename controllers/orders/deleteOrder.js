const { param } = require('express-validator');
const { NotFound } = require('http-errors');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Remove User by id
 * @param {import('express').Request} req request object
 * @param {import('express').Response} res response object
 * @param {import('express').NextFunction} next next function
 */
async function deleteUser(req, res, next) {
  try {
    const order = await db.Order.findOne({
      where: { reference: req.params.uuid },
    });
    if (!order) {
      throw new NotFound('Order not found');
    }
    if (
      (await req.user.getRole()).name !== 'Admin' &&
      req.user.id !== order.UserId
    ) {
      // if the user is not an admin and the current user's id is not the same
      // as the id in the url then we don't want to reveal that there is an order
      // with that id so we just throw a 404 error
      throw new NotFound('Order not found');
    }
    await order.destroy();
    res.status(204).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

deleteUser.validate = [
  param('id').isUUID().withMessage('uuid must be valid'),
  validate,
];

module.exports = deleteUser;
