module.exports = app => {
  const restaurant = require("../controllers/restaurantController.js")
  const auth = require("../middleware/auth.js")
  const passport = require('passport')
  var router = require("express").Router()

  ////////////////////
  // POST Methods ////
  ////////////////////

  // Create a new Restaurant
  router.post("/", restaurant.createRestaurant);

  // Create a new address for Restaurant
  router.post("/address", auth.verifyToken, restaurant.createAddress);
  

  ////////////////////
  // Get Methods /////
  ////////////////////

  // Login a restaurant
  router.post("/login", auth.restaurantLogin);

  // Login a customer with google SSO
  router.get("/login/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

  // Google SSO
  router.get( '/login/google/callback',
  passport.authenticate( 'google', {
      successRedirect: './success',
      failureRedirect: './failure'
  }));

  router.get("/login/google/success", auth.restaurantGoogleSuccess);

  router.get("/login/google/failure", auth.restaurantGoogleFailure);

  // Retrieve a restaurant's details
  router.get("/", auth.verifyToken, restaurant.findRestaurant);

  // Retrieve a restaurant's address with id
  router.get("/address/", auth.verifyToken, restaurant.findRestaurantAddress);

  ////////////////////
  // Put Methods /////
  ////////////////////

  // Update a restaurant with id
  router.put("/", auth.verifyToken, restaurant.updateRestaurant);

  // Update a restaurant's address with id
  router.put("/address/", auth.verifyToken, restaurant.updateRestaurantAddress);

  app.use('/api/restaurants', router);
};