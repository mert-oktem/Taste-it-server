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
      menuID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "menuID",
        references: {
          model: 'menus',
          key: 'menuID'
       }
      },
      isActive: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: true,
        comment: null,
        field: "isActive"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("menuChoicesLinks")
  }
};
