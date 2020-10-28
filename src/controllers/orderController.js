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
const orders = require("../models/menuChoicesLinkModel")


////////////////////
// POST Methods ////
////////////////////

// Create and save a new order from a customer
exports.createOrder = async function (req, res, next) {
  // This method needs: customerID, orderStatusID(Default), estimatedDeliveryTime,numberOfPeople
  // Add joi function to validate request!

  // Customer ID
  const decodedJwt = jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID
  
  // Delivery Address
   const address = await sequelize.query(  
  `SELECT countryDescription, provinceDescription, cityDescription, address, postcode, instructions 
  FROM addresses
  LEFT JOIN customerAddressLinks
  ON customerAddressLinks.addressID = addresses.addressID
  LEFT JOIN countries
  ON countries.countryID = addresses.countryID
  LEFT JOIN provinces
  ON provinces.provinceID = addresses.provinceID
  LEFT JOIN cities
  ON cities.cityID = addresses.cityID
  WHERE customerID = ${customerID} AND addresses.isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { console.log(data)})
  .catch(err => { res.status(500).send({ message: err.message }) });

  // Budget
  const budget = req.body.budget;

  // Number of people
  const numberOfPeople = req.body.numberOfPeople;


  /////////////////////////////////////////////////////////////////
  //STEP 2. Narrow down menus by cuisines                        //
  /////////////////////////////////////////////////////////////////

  await sequelize.query(  
    `-- 5. Budget Filter
    SELECT menus.menuID
    FROM menus
    INNER JOIN menuChoicesLinks
    ON menus.menuID IN (
    -- 4. Allergens Filter
    SELECT menus.menuID
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
          AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = 1 ))
        INNER JOIN choices 
        ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Spiciness"
        AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = 1 ))
      INNER JOIN choices
      ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Diet Types"
      AND choices.choiceID IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = 1 )
    )
    INNER JOIN choices
    ON menuChoicesLinks.choiceID = choices.choiceID AND choices.category = "Allergens"
    AND choices.choiceID NOT IN ( SELECT choiceID FROM customerChoicesLinks WHERE customerChoicesLinks.customerID = 1 )
    GROUP BY menus.menuID
    )
    WHERE menus.price < 30
    GROUP BY menus.menuID`, { type: QueryTypes.SELECT })
    .then(data => { console.log(data)})
    .catch(err => { res.status(500).send({ message: err.message }) });
}

// ////////////////////
// // GET Methods /////
// ////////////////////

// Find active Orders with customer ID
exports.findActiveOrdersCustomers = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  sequelize.query(`SELECT menus.menuID, menuName, menuDesc, price, pictureURI, restaurantName, restaurantDesc
  FROM menus
  LEFT JOIN Links
  ON customerAddressLinks.addressID = addresses.addressID
  LEFT JOIN countries
  ON countries.countryID = addresses.countryID
  LEFT JOIN provinces
  ON provinces.provinceID = addresses.provinceID
  LEFT JOIN cities
  ON cities.cityID = addresses.cityID
  WHERE customerID = ${customerID} AND addresses.isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// // Find active Orders with restaurant ID
// exports.findActiveOrdersRestaurant = async function (req, res, next) {
// }

// // Find a customer's previous orders
// exports.findOrderHistoryCustomers = async function (req, res, next) {
// }

// // Find previous orders with a restaurantID
// exports.findOrderHistoryRestaurant = async function (req, res, next) {
// }

// ////////////////////
// // PUT Methods //
// ////////////////////

// // Update a Customer by the id in the request
// exports.updateOrder = async function (req, res, next) {
// }
