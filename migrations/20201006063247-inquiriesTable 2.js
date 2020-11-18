'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("inquiries", {
      inquiryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "inquiryID"
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "name"
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "phoneNumber"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "email"
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: null,
        field: "subject"
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "body",
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: null,
        field: "is_active",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orderHistories")
  }
};
