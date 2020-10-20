module.exports = app => {
    const menus = require("../controllers/menuController.js");
  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", menus.createMenu);

    // Add a new choice for a menu
    router.post("/choice", menus.addMenuChoice);

    // Retrieve a menu active
    router.get("/:menuID", menus.findMenu);

    // Retrieve a restaurant's all menus
    router.get("/allMenu/:restaurantID", menus.findAllMenus);
  
    // Update a menu with id
    router.put("/:menuID", menus.updateMenu);
  
    // Update choices with id
    // router.put("/deactivechoices/:menuID", menus.updateChoices);

    app.use('/api/menus', router);
};