'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Product);
      OrderProduct.belongsTo(models.Order);
    }
  }
  OrderProduct.init(
    {
      quantity: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'OrderProduct',
    }
  );
  return OrderProduct;
};
