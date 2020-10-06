'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("choices", {
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
        field: "category",
      },
      choiceDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "choiceDescription",
      },
      pictureURI: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: null,
        field: "pictureURI",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("choices")
  }
};
