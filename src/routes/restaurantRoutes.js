module.exports = app => {
  const restaurant = require("../controllers/restaurantController.js");
  const auth = require("../middleware/auth.js")
  var router = require("express").Router();

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