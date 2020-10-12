module.exports = app => {
    const orders = require("../controllers/orderController.js");
  
    var router = require("express").Router();
  
    // Create a new order
    router.post("/", orders.createOrder);
  
    // Retrieve a customer's active order
    router.get("/:id", orders.findOrder);

    // Retrieve a customer's previous orders
    router.get("/orderhistory/:id", orders.findOrherHistory);
  
    // Update a customer with id
    router.put("/:id", orders.updateOrder);
  
    app.use('/api/orders', router);
};