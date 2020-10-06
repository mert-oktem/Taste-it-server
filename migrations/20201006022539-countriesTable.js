'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("countriesTable", {
      countryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "countryID"
      },
      countryDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: null,
        field: "countryDescription"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("countriesTable")
  }
};
