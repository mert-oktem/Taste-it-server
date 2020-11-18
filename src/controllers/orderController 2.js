const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const request = require('request');
const reqp  = require('request-promise-native');
const cors = require("cors");

// JWT
const jwt = require('jsonwebtoken');

// Importing necessary tables
const customers = require("../models/customersModel")

const addresses = require("../models/addressesModel")
const countries = require('../models/countriesModel')
const provinces = require("../models/provincesModel")
const cities = require("../models/citiesModel")
const customerAddressLink = require("../models/customerAddressLinkModel")
const restaurantAddressLink = require("../models/restaurantAddressLinkModel")

const choices = require("../models/choicesModel")
const customerChoices = require("../models/customerChoicesModel");
const menus = require("../models/menusModel")
const menuChoices = require("../models/menuChoicesLinkModel")
const orders = require("../models/ordersModel")
const orderMenuLinks = require("../models/orderMenuLinkModel")

const apiKey = ''

////////////////////
// POST Methods ////
////////////////////

// Confirm an order (Send an order)
exports.confirmOrder = async function (req, res, next) {
  // This method needs: customerID, forHowManyPeople, menuID 
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // Create a new order
  const newOrder = {
    customerID: customerID,
    forHowManyPeople: req.body.forHowManyPeople,
    orderStatusID: 1,
  }
  orders.create(newOrder)
  // Link the order with the selected menu
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

// Pick a menu based on the customer's choices
exports.pickMenu = async function (req, res, next) {
  // This method needs: customerID, budget
  // Add joi function to validate request!

  // Find customer ID with token
  const decodedJwt = jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // Budget
  const budget = req.body.budget;
  

  // Narrow down menus to one thru each choice requirements
  await sequelize.query(  
    `-- 4. Allergens Filter
    SELECT menus.menuID, menus.restaurantID, menus.price
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
    ) AND menus.menuID NOT IN (
      -- isOrderAgain Filter
      SELECT menuID
      FROM orderMenuLinks
      LEFT JOIN orders
      ON orders.orderID = orderMenuLinks.orderID AND orders.isOrderAgain = False AND customerID = ${customerID}
    )
    INNER JOIN choices
    ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Allergens" WHERE menuChoicesLinks.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = ${customerID} ))
    AND menus.price < ${budget} AND menus.isActive = true
    ORDER BY RAND() LIMIT 1`, { type: QueryTypes.SELECT })
    .then(data => { res.send(data)})
    .catch(err => { res.status(500).send({ message: err.message }) });
}



// Estimate a delivery time
exports.estimateDeliveryTime = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // Get customer-address-link using customerID
  const cAddressLink = await customerAddressLink.findOne({ where: {customerID: customerID} })
  .catch(err => { res.status(500).send({ message: err.message } )})
  // Get customer's addressID using customer-address-link
  const customerAddress = await addresses.findOne({ where: {addressID: cAddressLink.addressID} })
  .catch(err => { res.status(500).send({ message: err.message } )})

  // Get restaurant-address-link using restaurantID
  const rAddressLink = await restaurantAddressLink.findOne({ where: {restaurantID: req.body.restaurantID} })
  .catch(err => { res.status(500).send({ message: err.message } )})
  // Get restaurant's addressID using restaurant-address-link
  const restaurantAddress = await addresses.findOne({ where: {addressID: rAddressLink.addressID} })
  .catch(err => { res.status(500).send({ message: err.message } )})

  reqp(`https://maps.googleapis.com/maps/api/directions/json?origin=${restaurantAddress.postcode}&destination=${customerAddress.postcode}&key=${apiKey}`)
  .then(data => { res.send(JSON.parse(data).routes[0].legs[0].duration.text) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}




// Find orders with customer ID and orderStatusID
exports.findOrdersCustomers = async function (req, res, next) {
  // This method needs: customerID, orderStatusID 
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  // status = "Confirming Order with the restaurant", "Being prepared", "Being delivered", "Delivered", "Reviewed"
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

// Find orders with restaurant ID 
exports.findOrdersRestaurant = async function (req, res, next) {
  // This method needs: restaurantID, orderStatusID
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID;
  
  sequelize.query(`SELECT orders.orderID, menus.menuName, orders.forHowManyPeople, orders.orderStatusID, customers.firstName, customers.lastName, addresses.address, addresses.postcode, customers.phoneNumber, addresses.instructions, orders.createdAt, orders.review, orders.rate
  FROM orders
  LEFT JOIN orderMenuLinks
  ON orders.orderID = orderMenuLinks.orderID
  LEFT JOIN menus
  ON orderMenuLinks.menuID = menus.menuID
  LEFT JOIN customers
  ON orders.customerID = customers.customerID
  LEFT JOIN customerAddressLinks
  ON customers.customerID = customerAddressLinks.customerID
  LEFT JOIN addresses
  ON addresses.addressID = customerAddressLinks.addressID
  LEFT JOIN cities
  ON cities.cityID = addresses.cityID
  WHERE restaurantID = ${restaurantID}`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}


// ////////////////////
// // PUT Methods //
// ////////////////////

// Update an order status
exports.updateOrder = async function (req, res, next) {
  // This method needs: orderID

  const orderID = req.body.orderID;

  // Find order using orderID
  const order = await orders.findByPk(orderID)
  .catch(err => { res.status(500).send({ message: err.message } )})

  // Check if the req.body contains options, if not use the same record in the db
  const orderStatusID = req.body.orderStatusID ? req.body.orderStatusID : order.orderStatusID
  
  
  order.update({
    orderStatusID: orderStatusID
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
}
