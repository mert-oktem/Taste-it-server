module.exports = app => {
    const menus = require("../controllers/menuController.js");
    const imageUploader = require('../middleware/imageUploader.js')
    const auth = require("../middleware/auth.js")

  
    var router = require("express").Router();
  
    // Create a new menu
    router.post("/", auth.verifyToken, imageUploader.single('image'), menus.createMenu);

    // Add a new choice for a menu
    router.post("/choice", auth.verifyToken, menus.addMenuChoice);

    // Retrieve a menu active
    router.get("/:menuID", auth.verifyToken, menus.findMenu);

    // Retrieve a menu's image
    router.get("/image/:menuID", auth.verifyToken, menus.findMenuImage);

    // Retrieve a menu's choices
    router.get("/choices/:menuID", auth.verifyToken, menus.findMenuChoices);

    // Retrieve a restaurant's all menus
    router.get("/allMenus", auth.verifyToken, menus.findAllMenus);
  
    // Update a menu with id
    router.put("/:menuID", auth.verifyToken, imageUploader.single('image'), menus.updateMenu);
  
    // Update choices with id
    router.put("/deactivechoices/:menuID", menus.deActivateChoices);

    app.use('/api/menus', router);
};

