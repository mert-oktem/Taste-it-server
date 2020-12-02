module.exports = app => {
  const choices = require("../controllers/choiceController.js");
  var router = require("express").Router();

  // Create a new choice


  // Retrieve choices from a choice category
  router.get("/:category", choices.findChoices);
  router.get("/list/categories", choices.findCategories);

  // Update a choice


  app.use('/choices', router);
};