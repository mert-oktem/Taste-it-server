const Sequelize = require("sequelize");

module.exports = sequelize.define("orderMenuLinks", {
      orderMenuLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderMenuLinkID"
      },
      orderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "orderID"
      },
      menuID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "menuID"
      }
});