const Sequelize = require("sequelize");

module.exports = sequelize.define("provinces", {
      provinceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "provinceID"
      },
      provinceDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "provinceDescription"
      }
});
