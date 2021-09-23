const { body } = require('express-validator');
const { NotFound, UnprocessableEntity } = require('http-errors');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const validate = require('../../middleware/validate');
const db = require('../../models');

/**
 * Create Order
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 * @param {import('express').NextFunction} next next middleware function
 */
async function createOrder(req, res, next) {
  // there's a few things we need to do here, so we're doing them all in a transaction
  const transaction = await db.sequelize.transaction();
  try {
    let userId = req.user.id;
    if (req.body.userId) {
      if ((await req.user.getRole()).name === 'Admin') {
        // if the user is an admin, use the userId from the request body
        userId = req.body.userId;
      } else if (req.user.id !== req.body.userId) {
        // if the user is not an admin and the current user's id is not the same
        // as the id in the request then we don't want to reveal that there is a user
        // with that id so we just throw a 404 error
        throw new NotFound('User not found');
      }
    }

    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new NotFound('User not found');
    }

    // first, create the order
    const order = await db.Order.create(
      {
        reference: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company || null,
        address1: req.body.address1,
        address2: req.body.address2 || null,
        city: req.body.city,
        region: req.body.region,
        postcode: req.body.postcode,
        notes: req.body.notes || null,
        UserId: user.id,
      },
      { transaction },
    );

    // find all the products on the order in the database
    const productsInOrder = req.body.products;
    const productsInDb = await db.Product.findAll({
      where: {
        id: { [Op.in]: req.body.products.map((product) => product.id) },
      },
    });
    // if some products could not be found, tell 'em
    if (productsInDb.length !== productsInOrder.length) {
      throw new UnprocessableEntity('Some products were not found');
    }
    // check if the quantity of the product is available and build an array of the products
    const productsToAdd = productsInOrder.map((product) => {
      const productInDb = productsInDb.find((p) => p.id === product.id);
      if (productInDb.quantity < product.quantity) {
        throw new UnprocessableEntity(
          `Product ${productInDb.name} only has ${productInDb.quantity} in stock (requested ${product.quantity})`,
        );
      }
      return {
        ProductId: product.id,
        OrderId: order.id,
        quantity: product.quantity,
      };
    });

    await Promise.all(
      productsToAdd.map(async (product) => {
        const productInDb = productsInDb.find(
          (p) => p.id === product.ProductId,
        );
        // decrease the quantity of the product in the database
        await productInDb.decrement(
          { quantity: product.quantity },
          { transaction },
        );
        // add the product to the order
        await order.createOrderProduct(product, { transaction });
      }),
    );
    // if everything went well, commit the transaction and send the response
    await transaction.commit();
    res.status(201).json(order);
  } catch (err) {
    // if something went wrong, rollback the transaction and send the error
    transaction.rollback();
    next(err);
  }
}

createOrder.validate = [
  body('firstName')
    .exists()
    .withMessage('firstName is required')
    .isLength({ max: 255 })
    .withMessage('first name must be less than 255 characters')
    .trim()
    .escape(),
  body('lastName')
    .exists()
    .withMessage('lastName is required')
    .isLength({ max: 255 })
    .withMessage('last name must be less than 255 characters')
    .trim()
    .escape(),
  body('company')
    .optional()
    .isLength({ max: 255 })
    .withMessage('company must be less than 255 characters')
    .trim()
    .escape(),
  body('address1')
    .exists()
    .withMessage('address is required')
    .isLength({ max: 255 })
    .withMessage('address must be less than 255 characters')
    .trim()
    .escape(),
  body('address2')
    .optional()
    .isLength({ max: 255 })
    .withMessage('address must be less than 255 characters')
    .trim()
    .escape(),
  body('city')
    .exists()
    .withMessage('city is required')
    .isLength({ max: 255 })
    .withMessage('city must be less than 255 characters')
    .trim()
    .escape(),
  body('region')
    .exists()
    .withMessage('region is required')
    .isLength({ max: 255 })
    .withMessage('region must be less than 255 characters')
    .trim()
    .escape(),
  body('postcode')
    .exists()
    .withMessage('postcode is required')
    .isLength({ max: 255 })
    .withMessage('postcode must be less than 255 characters')
    .trim()
    .escape(),
  body('products.*.id')
    .exists()
    .withMessage('product id is required')
    .isInt({ gt: 0 })
    .withMessage('product id must be a positive integer')
    .toInt(),
  body('products.*.quantity')
    .exists()
    .withMessage('product quantity is required')
    .isInt({ gt: 0 })
    .withMessage('product quantity must be a positive integer')
    .toInt(),
  body('notes').optional().trim().escape(),
  validate,
];

module.exports = createOrder;
