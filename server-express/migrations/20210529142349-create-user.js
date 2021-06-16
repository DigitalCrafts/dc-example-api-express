/** @typedef { import('sequelize/types').QueryInterface } QueryInterface QueryInterface */
/** @typedef { import('sequelize/types').DataTypes } DataTypes DataTypes */

module.exports = {
  /**
   * Run Migration
   * @param {QueryInterface} queryInterface sequelize Query Interface
   * @param {DataTypes} Sequelize available data types
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      resetToken: {
        type: Sequelize.STRING,
      },
      resetTokenExpiry: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * Rollback Migration
   * @param {QueryInterface} queryInterface sequelize Query Interface
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
