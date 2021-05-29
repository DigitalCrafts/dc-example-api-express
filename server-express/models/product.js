'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    }
  );
  return Product;
};
