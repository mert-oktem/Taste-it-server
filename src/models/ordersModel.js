const Sequelize = require("sequelize");

module.exports = sequelize.define("orders", {
    orderID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "orderID"
    },
    customerID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "customerID"
    },
    orderStatusID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "orderStatusID"
    },
    estimatedDeliveryTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "estimatedDeliveryTime"
    },
    forHowManyPeople: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: null,
      field: "forHowManyPeople"
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