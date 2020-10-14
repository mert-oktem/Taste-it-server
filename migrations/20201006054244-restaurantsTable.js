'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("restaurants", {
      restaurantID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "restaurantID"
      },
      restaurantName: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: null,
        field: "restaurantName"
      },
      restaurantDescripton: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: null,
        field: "restaurantDescripton"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "email"
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "password"
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0,
        comment: null,
        field: "phoneNumber"
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "isActive"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("restaurants")
  }
};
