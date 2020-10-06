const Sequelize = require("sequelize");

module.exports = sequelize.define("countries", {
      countryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "countryID"
      },
      countryDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "countryDescription"
      }
});