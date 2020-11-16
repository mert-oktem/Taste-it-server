module.exports = app => {
    const orders = require("../controllers/orderController.js");
    const auth = require("../middleware/auth.js")
    var router = require("express").Router();
  
    // Confirm an order
    router.post("/", auth.verifyToken, orders.confirmOrder);
    
    // Pick a menu based on the customer's choices
    router.post("/pickMenu", auth.verifyToken, orders.pickMenu);

    // Get a Delivery Time
    router.post("/deliveryTime", auth.verifyToken, orders.estimateDeliveryTime);

    // Retrieve a customer's active order
    router.get("/customer", auth.verifyToken, orders.findOrdersCustomers);

    // Retrieve orders for a restaurant
    router.get("/restaurant", auth.verifyToken,  orders.findOrdersRestaurant);
    // auth.verifyToken,
    // Update an order with order ID
    router.put("/", auth.verifyToken, orders.updateOrder);
  
    app.use('/api/orders', router);
};