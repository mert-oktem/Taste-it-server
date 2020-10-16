const { QueryTypes } = require('sequelize');

// Importing necessary tables
const choices = require("../models/choicesModel")
const menus = require("../models/menusModel")
const menuChoiceLinks = require("../models/menuChoicesLinkModel")



////////////////////
// POST Methods ////
////////////////////

// Create and save a new Menu
exports.createMenu = async function (req, res, next) {
    // This method needs: restaurantID, menuName, menuDesc, price, pictureURI
    // Add joi function to validate request.
    
    // Create menu
    const menu = {
    restaurantID: req.body.restaurantID,
    menuName: req.body.menuName,
    menuDescription: req.body.menuDesc,
    price: req.body.price,
    pictureURI: req.body.pictureURI,
    active: true
    }

    // Save menu in the database
    menus.create(menu)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Create and save a new choice for a menu
exports.addMenuChoice = async function (req, res, next) {
    // This method needs: menuID, choiceName
    // Add joi function to validate request.

    // Get choiceID using choiceDescription
    const choice = await choices.findOne({where: {choiceDescription: req.body.choiceDescription}})
    if (choice === null) {
        console.log('Not found!');
    }
    
    // Create link
    const menuChoiceLink = {
        menuID: req.body.menuID,
        choiceID: choice.choiceID
    }

    // Save link in the database
    menuChoiceLinks.create(menuChoiceLink)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// GET Methods /////
////////////////////

// Find a Menu
exports.findMenu = async function (req, res, next) {
  // This method needs: menuID
  // Add joi function to validate request!

  const id = req.params.menuID

  await sequelize.query(  
    `SELECT *
    FROM menus
    LEFT JOIN menuChoicesLinks
    ON menus.menuID = menuChoicesLinks.menuID
    LEFT JOIN choices
    ON choices.choiceID = menuChoicesLinks.choiceID
    WHERE menuID = ${id}`, { type: QueryTypes.SELECT })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find All Menus from a restaurant
exports.findAllMenus = async function (req, res, next) {
    // This method needs: restaurantID
    // Add joi function to validate request!
    const id = req.params.id
  
    const choices = await sequelize.query(  
        `SELECT *
        FROM menus
        LEFT JOIN menuChoicesLinks
        ON menus.menuID = menuChoicesLinks.menuID
        LEFT JOIN choices
        ON choices.choiceID = menuChoicesLinks.choiceID
        WHERE restaurantID = ${id}`, { type: QueryTypes.SELECT })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message }) })
  }

////////////////////
// PUT Methods //
////////////////////

// Update a Customer by the id in the request
exports.updateMenu = async function (req, res, next) {
    // This method needs: menuID
    // Add joi function to validate request!
    const id = req.params.id;

    const menu = await menus.findByPk(id)
    .catch(err => { res.status(500).send({ message: err.message } )})

    const menuName = req.body.menuName ? req.body.menuName : menu.menuName
    const menuDesc = req.body.menuDesc ? req.body.menuDesc : menu.menuDesc
    const price= req.body.price ? req.body.price : menu.price
    const pictureURI = req.body.pictureURI ? req.body.pictureURI : customer.pictureURI

    await menu.update({
      menuName: menuName,
      menuDesc: menuDesc,
      price: price,
      pictureURI: pictureURI
    })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message } )})
}