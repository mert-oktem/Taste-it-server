module.exports = app => {
    const customer = require("../controllers/customerController.js");
    const auth = require("../middleware/auth.js");
    const passport = require('passport')
    var router = require("express").Router();

    ////////////////////
    // POST Methods ////
    ////////////////////
  
    // Create a new Customer
    router.post("/", customer.createCustomer);

    // Create a new address for Customer
    router.post("/address", auth.verifyToken, customer.createAddress);

    // Create a new choice for Customer
    router.post("/choice", auth.verifyToken, customer.createChoice);

    ////////////////////
    // Get Methods /////
    ////////////////////

    // Login a customer
    router.post("/login", auth.customerLogin);

    // Login a customer with google SSO
    router.get("/login/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Google SSO
    router.get( '/login/google/callback',
    passport.authenticate( 'google', {
        successRedirect: './success',
        failureRedirect: './failure'
    }));

    router.get("/login/google/success", auth.customerGoogleSuccess);

    router.get("/login/google/failure", auth.customerGoogleFailure);
  
    // Retrieve a customer's details
    router.get("/", auth.verifyToken, customer.findCustomer);

    // Retrieve a customers choices with id
    router.get("/choices/", auth.verifyToken, customer.findCustomerChoices);

    // Retrieve a customer's address with id
    router.get("/address/", auth.verifyToken, customer.findCustomerAddress);

    ////////////////////
    // Put Methods /////
    ////////////////////
  
    // Update a customer with id
    router.put("/", auth.verifyToken, customer.updateCustomer);

    // Update a customer's address with id
    router.put("/address/", auth.verifyToken, customer.updateCustomerAddress);

    // Update a customer's choices with id
    router.put("/deactivechoices/", auth.verifyToken, customer.deactivateCustomerChoice);
  
    app.use('/api/customers', router);
};