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

  /////////////////////////////////////////////////////////////////
  // STEP 1. Prepare(get) all the data for the order from tables //
  /////////////////////////////////////////////////////////////////

  // Customer ID
  const decodedJwt = jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID
  
  // Delivery Address
   const address = sequelize.query(  
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
  

  // Spicy level
  const spicyLevel = sequelize.query(  
  `SELECT choices.choiceID 
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${customerID} and category = "Spiciness" and isActive=true`, { type: QueryTypes.SELECT })
  

  // Allergy
  const allergy = sequelize.query(  
  `SELECT choices.choiceID 
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${customerID} and category = "Allergens" and isActive=true`, { type: QueryTypes.SELECT })
  

  // Cuisine
  const cuisine = await sequelize.query(  
  `SELECT choices.choiceID
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${customerID} and category = "Cuisines" and isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { sequelize.query(  
    `SELECT menus.menuID
    FROM menus
    LEFT JOIN menuChoicesLinks
    ON menus.menuID = menuChoicesLinks.menuID
    WHERE choiceID = ${data}`, { type: QueryTypes.SELECT })})
  .catch(err => { res.status(500).send({ message: err.message }) });
  
  // Diet type
  const dietType = sequelize.query(  
  `SELECT choices.choiceID
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${customerID} and category = "Diet Types" and isActive=true`, { type: QueryTypes.SELECT })
  

  // Budget
  const budget = req.body.budget;

  // Number of people
  const numberOfPeople = req.body.numberOfPeople;


  /////////////////////////////////////////////////////////////////
  //STEP 2. Narrow down menus by cuisines                        //
  /////////////////////////////////////////////////////////////////
  
  

  // const pickedMenus = await menus.findAll({
  //   where:{
  //     // // CONDITION: The menu's spicy level has to match with customer's spicy level
  //     // spiciness: order.spicyLevel,
  //     // // CONDITION: The menu's cuisine has to be one of the customer's cuisines
  //     cusines: {
  //       [Op.or]: order.cuisine
  //     },
  //     // // CONDITION: The menu's allergy must not match with any of customer's diet types
  //     // allergens: {
  //     //   [Op.notIn]: order.allergy
  //     // },
  //     // // CONDITION: The menu's diet types have to match with all customer's diet types
  //     // dietType: order.dietType,
  //     // // CONDITION: The menu's price must be between customer's budget
  //     // price: {
  //     //   [Op.between]: [(order.budget-5), order.budget]
  //     // }
  //   }
  // })
  //   .then(data => { console.log(data)})
  //   .catch(err => { res.status(500).send({ message: err.message }) });
}

// ////////////////////
// // GET Methods /////
// ////////////////////

// Find active Orders with customer ID
exports.findActiveOrdersCustomers = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID;

  orders.findAll({
    where: {
      category: 'Spiciness'
    }
  })
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
