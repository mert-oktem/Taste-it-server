const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const provincesTable = sequelize.define("provincesTable", {
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
    });
    return provincesTable;
  };