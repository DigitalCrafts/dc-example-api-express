const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Product
   * @typedef {object} Product
   * @property {string} name Name of the product
   * @property {string} image image path
   * @property {string} description description
   * @property {number} price price in USD cents
   * @property {number} quantity quantity in stock
   * @property {Date} publishedAt published at (use for scheduling)
   * @property {Date} createdAt created date/time
   * @property {Date} updatedAt updated date/time
   */
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Order, { through: models.OrderProduct });
      Product.hasMany(models.OrderProduct);
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      publishedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
