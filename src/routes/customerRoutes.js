module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customer.createCustomer);

    // Create a new address for Customer
    router.post("/address", customer.createAddress);

    // Create a new choice for Customer
    router.post("/choice", customer.createChoice);
  
    // Retrieve a customer with id
    router.get("/:id", customer.findCustomer);

    // Retrieve a customers choices with id
    router.get("/choices/:id", customer.findCustomerChoices);

    // Retrieve a customer's address with id
    router.get("/address/:id", customer.findCustomerAddress);
  
    // Update a customer with id
    router.put("/:id", customer.updateCustomer);

    // Update a customer's address with id
    router.put("/address/:id", customer.updateCustomerAddress);

    // Update a customer's choices with id
    router.put("/deactivechoices/:id", customer.deactivateCustomerChoice);
  
    app.use('/api/customers', router);
};