const Sequelize = require("sequelize");

module.exports = sequelize.define("choices", {
    choiceID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "choiceID"
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "category"
    },
    choiceDescription: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "choiceDescription"
    },
    pictureURI: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "pictureURI"
    }
});