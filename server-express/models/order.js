'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Product, { through: models.OrderProduct });
      Order.hasMany(models.OrderProduct);
    }
  }
  Order.init(
    {
      reference: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      company: {
        type: DataTypes.STRING,
      },
      address1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address2: {
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      region: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      postcode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: 'CREATED',
        type: DataTypes.ENUM,
        values: [
          'CREATED',
          'PAYMENT_PENDING',
          'PAYMENT_FAILED',
          'PROCESSING',
          'COMPLETED',
        ],
      },
      notes: {
        type: DataTypes.TEXT,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
