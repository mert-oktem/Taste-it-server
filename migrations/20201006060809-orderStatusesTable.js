'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("orderStatuses", {
      orderStatusID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderStatusID"
      },
      orderStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "orderStatusDescription"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orderStatuses")
  }
};
