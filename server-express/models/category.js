const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Category
   * @typedef {object} Category
   * @property {string} name Name of the category
   * @property {boolean} enabled if the category is publicly enabled
   * @property {string} createdAt created date/time - date-time
   * @property {string} updatedAt updated date/time - date-time
   */
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
    },
  );
  return Category;
};
