const Sequelize = require("sequelize");

module.exports = sequelize.define("newsRegisteredUsers", {
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