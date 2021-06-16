const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role);
      User.hasMany(models.Order);
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
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
