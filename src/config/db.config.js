module.exports = {
    HOST: "https://lair.wmdd.ca",
    USER: "lairdbadmin",
    PASSWORD: "479ghsJO@",
    DB: "lairdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };