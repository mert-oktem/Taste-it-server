'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("addresses", {
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
        field: "countryID",
        references: {
          model: 'countries',
          key: 'countryID'
       }
      },
      provinceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "provinceID",
        references: {
          model: 'provinces',
          key: 'provinceID'
       }
      },
      cityID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: null,
        field: "cityID",
        references: {
          model: 'cities',
          key: 'cityID'
       }
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
      isActive: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true,
        comment: null,
        field: "isActive"
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("addresses")
  }
};
