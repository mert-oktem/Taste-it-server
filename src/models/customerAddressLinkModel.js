const Sequelize = require("sequelize");

module.exports = sequelize.define("customerAddressLinks", {
      addressCustomerLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressCustomerLinkID"
      },
      addressID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "addressID"
      },
      customerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "customerID"
      }
});