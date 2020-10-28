module.exports = app => {
    const orders = require("../controllers/orderController.js");
    const auth = require("../middleware/auth.js")
    var router = require("express").Router();
  
    // Create a new order
    router.post("/", auth.verifyToken, orders.createOrder);
  

    // Retrieve a customer's active order
    router.get("/activeOrders/customer", auth.verifyToken, orders.findActiveOrdersCustomers);

    // // Retrieve orders for a restaurant
    // router.get("/activeOrders/restaurant", auth.verifyToken, orders.findActiveOrdersRestaurant);

    // // Retrieve a customer's previous orders
    // router.get("/pastOrders/customer", auth.verifyToken, orders.findOrderHistoryCustomers);
  
    // // Retrieve previous orders for a restaurant
    // router.get("/orderhistory/restaurant", auth.verifyToken, orders.findOrderHistoryRestaurant);

    // // Update an order with order ID
    // router.put("/:orderID", orders.updateOrder);
  
    app.use('/api/orders', router);
};