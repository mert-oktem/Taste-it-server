const Sequelize = require("sequelize");

module.exports = sequelize.define("orderStatuses", {
      orderStatusID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "orderStatusID"
      },
      orderStatusDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "orderStatusDescription"
      }
  });