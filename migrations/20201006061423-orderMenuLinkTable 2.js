'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("orderMenuLinks", {
      orderMenuLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderMenuLinkID"
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
      menuID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "menuID",
        references: {
          model: 'menus',
          key: 'menuID'
       }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orderMenuLinks")
  }
};
