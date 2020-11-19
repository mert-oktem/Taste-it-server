module.exports = {
    HOST: "54.243.236.248",
    USER: "root",
    PASSWORD: "Tasteit123%",
    DB: "tasteItDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };