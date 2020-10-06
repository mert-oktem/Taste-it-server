'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("restaurantAddressLinks", {
      addressRestaurantLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressRestaurantLinkID"
      },
      addressID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "addressID",
        references: {
          model: 'addresses',
          key: 'addressID'
       }
      },
      restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "customerID",
        references: {
          model: 'restaurants',
          key: 'restaurantID'
       }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("restaurantAddressLinks")
  }
};
