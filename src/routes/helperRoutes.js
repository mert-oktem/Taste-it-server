module.exports = app => {
  const helpers = require("../controllers/helperController.js");
  var router = require("express").Router();

  // Retrieve a list of countries options
  router.get("/countries", helpers.findCountries);

  // Retrieve a list of provinces options
  router.get("/provinces", helpers.findProvinces);

  // Retrieve a list of cities options
  router.get("/cities", helpers.findCities);

  // Retrieve a list of cuisines options
  router.get("/cuisines", helpers.findCuisines);

  // Retrieve a list of allergens options
  router.get("/allergens", helpers.findAllergens);

  // Retrieve a list of diet type options
  router.get("/dietTypes", helpers.findDietTypes);

  // Retrieve a list of spiciness options
  router.get("/spiciness", helpers.findSpiciness);

  // Retrieve a list of budgets options
  router.get("/budgets", helpers.findBudgets);

  // Retrieve a list of orderStatus options
  router.get("/orderStatus", helpers.findOrderStatus);

  app.use('/helpers', router);
};