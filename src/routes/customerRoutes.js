module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", customers.create);
  
    // Retrieve a single Customer with id
    router.get("/:id", customer.findOne);
  
    // Update a Customer with id
    router.put("/:id", customer.update);
  
    // Delete a Customer with id
    router.delete("/:id", customer.delete);
  
    app.use('/api/customers', router);
};