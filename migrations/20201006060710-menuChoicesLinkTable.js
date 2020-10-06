'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("menuChoicesLinks", {
      menuChoiceLinkID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "menuChoiceLinkID"
      },
      choiceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "choiceID",
        references: {
          model: 'choices',
          key: 'choiceID'
       }
      },
      restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "restaurantID",
        references: {
          model: 'restaurants',
          key: 'restaurantID'
       }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("menuChoicesLinks")
  }
};
