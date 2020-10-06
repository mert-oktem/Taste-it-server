const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const customerAddressLink = sequelize.define("customerAddressLinkTable", {
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
    });
    return customerAddressLink;
  };