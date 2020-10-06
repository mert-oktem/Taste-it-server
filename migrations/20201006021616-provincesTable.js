'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("provinces", {
      provinceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "provinceID"
      },
      provinceDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "provinceDescription"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("provinces")
  }
};
