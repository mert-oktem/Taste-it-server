const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const countriesTable = sequelize.define("countriesTable", {
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
    });
    return countriesTable;
  };