const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customerTable", {
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "customerID"
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: null,
      field: "firstName"
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: null,
      field: "lastName"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: null,
      field: "email"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: null,
      field: "password"
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      field: "phoneNumber"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: null,
      field: "is_active"
    }
  });
  return customer;
};