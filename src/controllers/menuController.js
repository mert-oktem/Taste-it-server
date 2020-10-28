const { QueryTypes } = require('sequelize');
const fs = require("fs");
const path = require("path");

// JWT
const jwt = require('jsonwebtoken');

// Importing necessary tables
const choices = require("../models/choicesModel")
const menus = require("../models/menusModel")
const menuChoiceLinks = require("../models/menuChoicesLinkModel")



////////////////////
// POST Methods ////
////////////////////

// Create and save a new Menu
exports.createMenu = async function (req, res, next) {
    // This method needs: token, menuName, menuDesc, price, pictureURI
    // Add joi function to validate request.
    const decodedJwt = await jwt.decode(req.token, { complete: true });
    const restaurantID = decodedJwt.payload.restaurant.restaurantID

    const pictureURI = req.file ? req.file.path : null
    
    // Create menu
    const menu = {
    restaurantID: restaurantID,
    menuName: req.body.menuName,
    menuDescription: req.body.menuDescription,
    price: req.body.price,
    pictureURI: pictureURI,
    isActive: true
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
        choiceID: choice.choiceID,
        isActive: true
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
      WHERE menuID = ${id}`, { type: QueryTypes.SELECT })
      .then(data => { 
        res.send(data) })
      .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a Menu's Image
exports.findMenuImage = async function (req, res, next) {
  // This method needs: menuID
  // Add joi function to validate request!
  const id = req.params.menuID

  await sequelize.query(
    `SELECT m.pictureURI
    FROM menus AS m
    LEFT JOIN menuChoicesLinks as mcl
    ON m.menuID = mcl.menuID
    WHERE m.menuID = ${id}`, { type: QueryTypes.SELECT })
    .then(data => { 
        let image = data[0].pictureURI
        res.sendFile(path.join(`${__basedir}/${image}`))
        })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a Menu's Image
exports.findMenuChoices = async function (req, res, next) {
    // This method needs: menuID
    // Add joi function to validate request!
  
    const id = req.params.menuID
  
    await sequelize.query(
      `SELECT *
      FROM choices
      LEFT JOIN menuChoicesLinks
      ON menuChoicesLinks.choiceID = choices.choiceID
      WHERE menuID = ${id} and menuChoicesLinks.isActive = true`, { type: QueryTypes.SELECT })
      .then(data => {res.send(data) })
      .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find All Menus from a restaurant
exports.findAllMenus = async function (req, res, next) {
    // This method needs: token
    // Add joi function to validate request!
    const decodedJwt = await jwt.decode(req.token, { complete: true });
    const restaurantID = decodedJwt.payload.restaurant.restaurantID
    console.log(restaurantID)
    await sequelize.query(  
        `SELECT *
        FROM menus
        LEFT JOIN menuChoicesLinks
        ON menus.menuID = menuChoicesLinks.menuID
        LEFT JOIN choices
        ON menuChoicesLinks.choiceID = choices.choiceID
        WHERE restaurantID = ${restaurantID} AND menuChoicesLinks.isActive = true
        AND menus.isActive = true`, { type: QueryTypes.SELECT })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message }) })
  }

////////////////////
// PUT Methods //
////////////////////

// Update a menu's basic info by the id in the request
exports.updateMenu = async function (req, res, next) {
    // This method needs: menuID
    // Add joi function to validate request!
    const id = req.params.menuID;

    const menu = await menus.findByPk(id)
    .catch(err => { res.status(500).send({ message: err.message } )})

    const menuName = req.body.menuName ? req.body.menuName : menu.menuName
    const menuDescription = req.body.menuDescription ? req.body.menuDescription : menu.menuDescription
    const price= req.body.price ? req.body.price : menu.price
    const pictureURI = req.file ? req.file.path : menu.pictureURI
    const isActive = req.body.isActive ? req.body.isActive : menu.isActive

    await menu.update({
      menuName: menuName,
      menuDescription: menuDescription,
      price: price,
      pictureURI: pictureURI,
      isActive: isActive,
    })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message } )})
}

// Update a menu's choice info by the id in the request
exports.deActivateChoices = async function (req, res, next) {
    // This method needs: menuID
    // Add joi function to validate request!
    const id = req.params.menuID;

    const menu = await menus.findByPk(id)
    .catch(err => { res.status(500).send({ message: err.message } )})

    await sequelize.query(  
        `UPDATE menuChoicesLinks
        LEFT JOIN choices
        ON choices.choiceID = menuChoicesLinks.choiceID
        SET menuChoicesLinks.isActive = false
        WHERE menuChoicesLinks.menuID = ${id} AND choices.category = "${req.body.category}"`, { type: QueryTypes.DELETE })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message }) 
      })
}


