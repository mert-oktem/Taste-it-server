const Sequelize = require("sequelize");

module.exports = sequelize.define("newsletterRegisteredUsers", {
      newsRegisteredUserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "newsRegisteredUserID"
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "email"
      }
});