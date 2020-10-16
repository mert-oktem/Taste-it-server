module.exports = app => {
    const menus = require("../controllers/menuController.js");
  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", menus.createMenu);

    // Add a new choice for a menu
    router.post("/choice", menus.addMenuChoice);

    // Retrieve a menu active
    router.get("/:menuID", menus.findMenu);

    // // Retrieve a restaurant's all menus
    // router.get("/:restaurantID", menus.findAllMenus);
  
    // // Update a menu with id
    // router.put("/:menuID", menus.updateMenu);
  
    app.use('/api/menus', router);
};