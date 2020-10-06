'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("customerAddressLink", {
      addressCustomerLinkID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressCustomerLinkID"
      },
      addressID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "addressID"
      },
      customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "customerID"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("customerAddressLink")
  }
};
