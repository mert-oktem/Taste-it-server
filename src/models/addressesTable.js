const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const addressesTable = sequelize.define("addressesTable", {
      addressID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressID"
      },
      countryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "countryID"
      },
      provinceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "provinceID"
      },
      cityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "cityID"
      },
      address: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: null,
        field: "address"
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: null,
        field: "postcode"
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
        comment: null,
        field: "instructions"
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "is_active"
      }
    });
    return addressesTable;
  };