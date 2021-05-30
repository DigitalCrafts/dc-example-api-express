const db = require('../../models');

async function getProducts(req, res) {
  res.json(await db.Product.findAll());
}

module.exports = getProducts;
