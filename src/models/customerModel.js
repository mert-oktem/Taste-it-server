module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };