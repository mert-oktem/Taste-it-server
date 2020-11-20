module.exports = app => {
    const menus = require("../controllers/menuController.js");
    const imageUploader = require('../middleware/imageUploader.js');
    const auth = require("../middleware/auth.js");

  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", auth.verifyToken, imageUploader.single('image'), menus.createMenu);

    // Add a new choice for a menu
    router.post("/choice", auth.verifyToken, menus.addMenuChoice);

    // Retrieve a menu active
    router.get("/singleMenu/:menuID", auth.verifyToken, menus.findMenu);

    // Retrieve a menu's image
    router.get("/image/:menuID", menus.findMenuImage);

    // Retrieve a menu's choices
    router.get("/choices/:menuID", auth.verifyToken, menus.findMenuChoices);

    // Retrieve a restaurant's all menus
    router.get("/all", auth.verifyToken, menus.findAllMenus);
  
    // Update a menu with id
    router.put("/:menuID", auth.verifyToken, imageUploader.single('image'), menus.updateMenu);
  
    // Update choices with id
    router.put("/deactivechoices/:menuID", menus.deActivateChoices);

    // Update a menu's choices with id
    router.put("/choices/deactivateChoices", auth.verifyToken, menus.deactivateMenuChoice);

    app.use('/api/menus', router);
};

