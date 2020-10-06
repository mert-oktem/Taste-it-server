const Sequelize = require("sequelize");

module.exports = sequelize.define("restaurantAddressLinks", {
      addressRestaurantLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressRestaurantLinkID"
      },
      addressID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "addressID"
      },
      restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "restaurantID"
      }
});