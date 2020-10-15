const Sequelize = require("sequelize");

module.exports = sequelize.define("inquiries", {
    inquiryID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "inquiries"
    },
    customerID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: null,
      field: "customerID"
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: null,
      field: "subject"
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: null,
      field: "body"
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      comment: null,
      field: "is_active"
    },
});