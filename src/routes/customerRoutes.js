module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customer.createCustomer);

    // Create a new address for Customer
    router.post("/address", customer.createAddress);

    // Create a new choice for Customer
    router.post("/choice", customer.createChoice);
  
    // Retrieve a single Customer with id
    router.get("/:id", customer.findCustomer);

    // Retrieve a single customers choices with id
    router.get("/choices/:id", customer.findCustomerChoices);

    // Retrieve all active customers
    router.get("/address/:id", customer.findCustomerAddress);
  
    // Update a Customer with id
    router.put("/:id", customer.update);
  
    // Delete a Customer with id
    router.delete("/:id", customer.delete);
  
    app.use('/api/customers', router);
};