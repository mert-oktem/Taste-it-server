const Sequelize = require("sequelize");

module.exports = sequelize.define("menuChoicesLinks", {
      menuChoicesLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "menuChoiceLinkID"
      },
      choiceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "choiceID"
      },
      menuID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "restaurantID"
      }
});