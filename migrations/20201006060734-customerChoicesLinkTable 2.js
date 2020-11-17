'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("customerChoicesLinks", {
      customerChoiceLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "customerChoiceLinkID"
      },
      choiceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "choiceID",
        references: {
          model: 'choices',
          key: 'choiceID'
       }
      },
      customerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "customerID",
        references: {
          model: 'customers',
          key: 'customerID'
       }
      },
      isActive: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: true,
        comment: null,
        field: "isActive"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("customerChoicesLinks")
  }
};
