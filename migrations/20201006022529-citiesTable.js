'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("citiesTable", {
      cityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "cityID"
      },
      cityDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: null,
        field: "cityDescription"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("citiesTable")
  }
};
