const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// JWT
const jwt = require('jsonwebtoken');

// Importing necessary tables
const customers = require("../models/customersModel")

const addresses = require("../models/addressesModel")
const countries = require('../models/countriesModel')
const provinces = require("../models/provincesModel")
const cities = require("../models/citiesModel")
const customerAddressLink = require("../models/customerAddressLinkModel")

const choices = require("../models/choicesModel")
const customerChoices = require("../models/customerChoicesModel");
const menus = require("../models/menusModel")
const menuChoices = require("../models/menuChoicesLinkModel")
const orders = require("../models/ordersModel")
const orderMenuLinks = require("../models/orderMenuLinkModel")


////////////////////
// POST Methods ////
////////////////////

// Confirm an order
exports.confirmOrder = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // Create a Customer
  const newOrder = {
    customerID: customerID,
    orderStatusID: 1,
    estimatedDeliveryTime: 30,
    forHowManyPeople: 1,
  }
  orders.create(newOrder)
  .then(data => {orderMenuLinks.create({
    menuID: req.body.menuID,
    orderID: data.orderID
  })})
  .then(data => { res.send("Order is sent!") })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// GET Methods /////
////////////////////

// Create and save a new order from a customer
exports.pickMenu = async function (req, res, next) {
  // This method needs: customerID, orderStatusID(Default), estimatedDeliveryTime,numberOfPeople
  // Add joi function to validate request!

  // Customer ID
  const decodedJwt = jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // Budget
  const budget = req.body.budget;

  /////////////////////////////////////////////////////////////////
  //STEP 2. Narrow down menus by cuisines                        //
  /////////////////////////////////////////////////////////////////

  await sequelize.query(  
    `-- 4. Allergens Filter
    SELECT *
    FROM menus
    INNER JOIN menuChoicesLinks
    ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
      -- 3. Diet Type filter
      SELECT menus.menuID
      FROM menus
      INNER JOIN menuChoicesLinks
      ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
        -- 2. Spiciness Filter
        SELECT menus.menuID
        FROM menus
        INNER JOIN menuChoicesLinks
        ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
          -- 1. Cuisine Filter
          SELECT menus.menuID
          FROM menus
          INNER JOIN menuChoicesLinks
          ON menus.menuID = menuChoicesLinks.menuID
          INNER JOIN choices
          ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Cuisines"
          AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
        INNER JOIN choices 
        ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Spiciness"
        AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
      INNER JOIN choices
      ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Diet Types"
      AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} )
    )
    INNER JOIN choices
    ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Allergens"
    WHERE menus.menuID NOT IN (SELECT menus.menuID FROM menus
    INNER JOIN menuChoicesLinks
    ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
      -- 3. Diet Type filter
      SELECT menus.menuID
      FROM menus
      INNER JOIN menuChoicesLinks
      ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
        -- 2. Spiciness Filter
        SELECT menus.menuID
        FROM menus
        INNER JOIN menuChoicesLinks
        ON menus.menuID = menuChoicesLinks.menuID AND menus.menuID IN (
          -- 1. Cuisine Filter
          SELECT menus.menuID
          FROM menus
          INNER JOIN menuChoicesLinks
          ON menus.menuID = menuChoicesLinks.menuID
          INNER JOIN choices
          ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Cuisines"
          AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
        INNER JOIN choices 
        ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Spiciness"
        AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
      INNER JOIN choices
      ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Diet Types"
      AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} )
    )
    INNER JOIN choices
    ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Allergens" WHERE menuChoicesLinks.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
    AND menus.price < ${budget}
    ORDER BY RAND() LIMIT 1`, { type: QueryTypes.SELECT })
    .then(data => { res.send(data)})
    .catch(err => { res.status(500).send({ message: err.message }) });
}



// // Estimate a delivery time
// exports.estimateDeliveryTime = async function (req, res, next) {
//   // Find customer ID with token
//   const decodedJwt = await jwt.decode(req.token, { complete: true });
//   const customerID = decodedJwt.payload.customer.customerID;

  
//   .then(data => { res.send(data) })
//   .catch(err => { res.status(500).send({ message: err.message }) })
// }




// Find orders with customer ID and orderStatusID
exports.findOrdersCustomers = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  const orderStatusID = req.body.orderStatusID

  sequelize.query(`SELECT *
  FROM orders
  LEFT JOIN orderMenuLinks
  ON orders.orderID = orderMenuLinks.orderID
  LEFT JOIN menus
  ON orderMenuLinks.menuID = menus.menuID
  WHERE customerID = ${customerID} AND orders.orderStatusID = ${orderStatusID}`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find orders with restaurant ID and orderStatusID
exports.findOrdersRestaurant = async function (req, res, next) {
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID;

  const orderStatusID = req.body.orderStatusID

  sequelize.query(`SELECT *
  FROM orders
  LEFT JOIN orderMenuLinks
  ON orders.orderID = orderMenuLinks.orderID
  LEFT JOIN menus
  ON orderMenuLinks.menuID = menus.menuID
  WHERE restaurantID = ${restaurantID} AND orders.orderStatusID = ${orderStatusID}`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}


// ////////////////////
// // PUT Methods //
// ////////////////////

// Update an order status
exports.updateOrder = async function (req, res, next) {
  const orderID = req.body.orderID;

  // Find order using orderID
  const order = await orders.findByPk(orderID)
  .catch(err => { res.status(500).send({ message: err.message } )})

  const orderStatusID = req.body.orderStatusID ? req.body.orderStatusID : order.orderStatusID
  
  await order.update({
    orderStatusID: orderStatusID
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
}
