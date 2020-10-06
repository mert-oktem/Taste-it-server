'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("orderHistories", {
      orderHistoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderHistoryID"
      },
      orderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "orderID",
        references: {
          model: 'orders',
          key: 'orderID'
       }
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
        field: "rate",
      },
      isOrderAgain: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: null,
        field: "isOrderAgain",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orderHistories")
  }
};
