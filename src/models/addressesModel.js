const Sequelize = require("sequelize");

module.exports = sequelize.define("addresses", {
      addressID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "addressID"
      },
      countryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "countryID"
      },
      provinceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "provinceID"
      },
      cityID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "cityID"
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "address"
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "postcode"
      },
      instructions: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
        comment: null,
        field: "instructions"
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "is_active"
      }
});