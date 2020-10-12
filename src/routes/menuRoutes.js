module.exports = app => {
    const menus = require("../controllers/menuController.js");
  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", menus.createOrder);

    // Retrieve a menu active
    router.get("/:id", menus.findMenu);

    // Retrieve a restaurant's all menus
    router.get("/:id", menus.findAllMenus);
  
    // Update a customer with id
    router.put("/:id", menus.updateMenu);
  
    app.use('/api/menus', router);
};