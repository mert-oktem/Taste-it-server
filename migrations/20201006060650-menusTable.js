'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("menus", {
      menuID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "menuID"
      },
      restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "restaurantID",
        references: {
          model: 'restaurants',
          key: 'restaurantID'
       }
      },
      menuName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "menuName",
      },
      menuDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "menuDescription",
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "price",
      },
      pictureURI: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "pictureURI",
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "is_active",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("menus")
  }
};
