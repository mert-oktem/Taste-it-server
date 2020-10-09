const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//const db = {};

//db.Sequelize = Sequelize;
//db.sequelize = sequelize;

//db.customersTable = require("./customerModel.js")(sequelize, Sequelize);
//db.adressesTable = require("./addressesTable.js")(sequelize, Sequelize);
//db.citiesTable = require("./citiesTable.js")(sequelize, Sequelize);
//db.countriesTable = require("./countriesTable.js")(sequelize, Sequelize);
//db.provincesTable = require("./provincesTable.js")(sequelize, Sequelize);
//db.customerAddressLink = require("./customerAddressLink.js")(sequelize, Sequelize);

module.exports = sequelize;
global.sequelize = sequelize;