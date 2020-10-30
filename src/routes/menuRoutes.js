module.exports = app => {
    const menus = require("../controllers/menuController.js");
    const imageUploader = require('../middleware/imageUploader.js');
    const auth = require("../middleware/auth.js");

  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", auth.verifyToken, imageUploader.single('image'), menus.createMenu);

    // Add a new choice for a menu
    router.post("/choice", menus.addMenuChoice);

    // Retrieve a menu active
    router.get("/:menuID", menus.findMenu);

    // Retrieve a menu's image
    router.get("/image/:menuID", menus.findMenuImage);

    // Retrieve a menu's choices
    router.get("/choices/:menuID", menus.findMenuChoices);

    // Retrieve a restaurant's all menus
    router.get("/allMenu/:restaurantID", menus.findAllMenus);
  
    // Update a menu with id
    router.put("/:menuID", imageUploader.single('image'), menus.updateMenu);
  
    // Update choices with id
    // router.put("/deactivechoices/:menuID", menus.updateChoices);

    app.use('/api/menus', router);
};

