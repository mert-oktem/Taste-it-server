const Sequelize = require("sequelize");

module.exports = sequelize.define("customerChoicesModel", {
      customerChoiceLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "customerChoiceLinkID"
      },
      choiceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "choiceID"
      },
      customerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "customerID"
      }
});