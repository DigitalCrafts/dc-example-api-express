/** @typedef { import('sequelize/types').QueryInterface } QueryInterface */
/** @typedef { import('sequelize/types').DataTypes } DataTypes */

module.exports = {
  /**
   * Run Migration
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
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
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  },
};
