'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(Category, { as: 'Parent', foreignKey: 'ParentId' });
      Category.hasMany(Category, { as: 'Children', foreignKey: 'ParentId' });
      Category.hasMany(models.Product);
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
