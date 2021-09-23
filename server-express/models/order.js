const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Order
   * @typedef {object} Order
   * @property {number} id Order id
   * @property {string} reference Order reference
   * @property {string} firstName Customer first name
   * @property {string} lastName Customer last name
   * @property {string} company Customer company
   * @property {string} address1 Customer address
   * @property {string} address2 Customer address
   * @property {string} city Customer city
   * @property {string} region Customer region
   * @property {string} postcode Customer postcode
   * @property {string} status Order status - enum:CREATED,PAYMENT_PENDING,PAYMENT_FAILED,PROCESSING,COMPLETED
   * @property {string} notes Order notes
   * @property {number} UserId User id
   * @property {string} createdAt created date/time - date-time
   * @property {string} updatedAt updated date/time - date-time
   */
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
      hooks: {
        afterCreate(order) {
          // simulate payment process
          setTimeout(() => {
            // after 5 seconds, update order status to PAYMENT_PENDING
            order.update({ status: 'PAYMENT_PENDING' }).then(() => {
              setTimeout(() => {
                // after 10 seconds, there is a 10% chance of payment failure
                if (Math.random() > 0.9) {
                  order.update({ status: 'PAYMENT_FAILED' });
                } else {
                  // otherwise, update order status to PROCESSING
                  order.update({ status: 'PROCESSING' }).then(() => {
                    setTimeout(() => {
                      // after 20 seconds, update order status to COMPLETED
                      order.update({ status: 'COMPLETED' }).then(() => {
                        console.log('Order completed');
                      });
                    }, 5000);
                  });
                }
              }, 5000);
            });
          }, 5000);
        },
      },
    },
  );
  return Order;
};
