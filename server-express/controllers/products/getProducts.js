const { Op, DataTypes } = require('sequelize');
const db = require('../../models');

/**
 * Get All published products
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getProducts(req, res) {
  res.json(
    await db.Product.findAll({
      where: {
        publishedAt: {
          [Op.lt]: Date.now(),
        },
      },
    })
  );
}

module.exports = getProducts;
