const Sequelize = require("sequelize");

module.exports = sequelize.define("menus", {
    menuID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "menuID"
    },
    restaurantID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "restaurantID"
    },
    menuName: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "menuName"
    },
    menuDescription: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "menuDescription"
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "price"
    },
    pictureURI: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: null,
      field: "pictureURI"
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: null,
      field: "isActive"
    },
});