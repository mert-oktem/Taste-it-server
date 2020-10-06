'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("newsRegisteredUsers", {
      newsRegisteredUsersID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "newsRegisteredUserID"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "email"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("newsRegisteredUsers")
  }
};
