'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      customerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "customerID"
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "firstName"
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "lastName"
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
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: null,
        field: "phoneNumber"
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "is_active"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("customers")
  }
};
