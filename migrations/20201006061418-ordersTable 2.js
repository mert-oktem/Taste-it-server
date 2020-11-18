'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      orderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderID"
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
      orderStatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "orderStatusID",
        references: {
          model: 'orderStatuses',
          key: 'orderStatusID'
       }
      },
      estimatedDeliveryTime: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: null,
        field: "estimatedDeliveryTime",
      },
      forHowManyPeople: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: null,
        field: "forHowManyPeople",
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: null,
        field: "review"
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: null,
        field: "rate"
      },
      isOrderAgain: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: null,
        field: "isOrderAgain"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orders")
  }
};
