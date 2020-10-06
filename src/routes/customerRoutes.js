module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customer.create);
  
    // Retrieve a single Customer with id
    router.get("/:id", customer.findOne);

    // Retrieve all active customers
    router.get("/findall/:id", customer.findAllCustomers);
  
    // Update a Customer with id
    router.put("/:id", customer.update);
  
    // Delete a Customer with id
    router.delete("/:id", customer.delete);
  
    app.use('/api/customers', router);
};