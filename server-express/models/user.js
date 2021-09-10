const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * @typedef {object} User
   * @property {string} email email address
   * @property {string} name full name
   * @property {number} RoleId ID of the user's role
   */
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role);
      User.hasMany(models.Order);
    }

    /**
     * protected fields for user object
     */
    protected = ['password', 'resetToken', 'resetTokenExpiry'];

    /**
     * Helper method for validating user's password with bcrypt
     * @param {string} password password hash (bcrypt)
     * @returns {boolean} true if password is valid
     */
    validPassword(password) {
      // validate password with bcrypt
      return bcrypt.compareSync(password, this.password);
    }

    /**
     * generate a JWT token for the user
     * @returns {string} JWT token
     */
    generateToken() {
      return jwt.sign(
        {
          id: this.id,
          email: this.email,
          role: this.RoleId,
        },
        process.env.JWT_SECRET,
      );
    }

    /**
     * Convert user to JSON safe object
     * @returns {object} user object without protected fields
     */
    toJSON() {
      const values = { ...this.get() };
      this.protected.forEach((prop) => {
        delete values[prop];
      });
      return values;
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      RoleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      resetToken: {
        type: DataTypes.STRING,
      },
      resetTokenExpiry: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
