const db = require('../../models');

/**
 * Get all categories
 * @param {import('express').Request} req request from client
 * @param {import('express').Response} res response object
 */
async function getCategories(req, res) {
  res.json(
    await db.Category.findAll({
      where: {
        enabled: true,
      },
    }),
  );
}

module.exports = getCategories;
