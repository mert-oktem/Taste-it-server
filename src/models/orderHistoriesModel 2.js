const Sequelize = require("sequelize");

module.exports = sequelize.define("orderHistories", {
    orderHistoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "orderHistoryID"
    },
    orderID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "orderID"
    },
    review: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: null,
      field: "review"
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: null,
      field: "rate"
    },
    isOrderAgain: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      comment: null,
      field: "isOrderAgain"
    },
});