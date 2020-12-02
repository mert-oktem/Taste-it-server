module.exports = app => {
  const newsletterRegisteredUsers = require("../controllers/newsletterRegisteredUserController.js");
  var router = require("express").Router();

  ////////////////////
  // POST Methods ////
  ////////////////////

  // Create a new newsletter registered user
  router.post("/", newsletterRegisteredUsers.createNewsletterRegisteredUser);
  
  
  ////////////////////
  // Get Methods /////
  ////////////////////

  // Retrieve a newsletter registered users's details
  router.get("/", newsletterRegisteredUsers.findNewsletterRegisteredUser);


  ////////////////////
  // Put Methods /////
  ////////////////////

  // // Update a newsletter registered users with id
  // router.put("/", newsletterRegisteredUsers.updateNewsletterRegisteredUsers);

  app.use('/newsletterRegisteredUsers', router);
};