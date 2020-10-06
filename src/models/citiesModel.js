const Sequelize = require("sequelize");

module.exports = sequelize.define("cities", {
      cityID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "cityID"
      },
      cityDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "cityDescription"
      }
  });