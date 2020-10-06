'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("provincesTable", {
      provinceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "provinceID"
      },
      provinceDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: null,
        field: "provinceDescription"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("provincesTable")
  }
};
