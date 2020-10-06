const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const citiesTable = sequelize.define("citiesTable", {
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
    });
    return citiesTable;
  };