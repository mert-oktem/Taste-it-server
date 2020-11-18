'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("customerAddressLinks", {
      addressCustomerLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressCustomerLinkID"
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("customerAddressLinks")
  }
};
