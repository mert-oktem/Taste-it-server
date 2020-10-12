const { QueryTypes } = require('sequelize');

// Importing necessary tables
const customers = require("../models/customersModel")

const addresses = require("../models/addressesModel")
const countries = require('../models/countriesModel');
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

// Create and save a new Customer
exports.createOrder = async function (req, res, next) {
    // This method needs: firstName, lastName, email, password, phoneNumber
    // Add joi function to validate request!

    // Hash Password
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    
    // Create a Customer
    const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    phoneNumber: req.body.phoneNumber,
    active: true
    }

    // Save Customer in the database
    customers.create(customer)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// GET Methods /////
////////////////////

// Find Order
exports.findOrder = async function (req, res, next) {
  // This method needs: userName, password
  // Add joi function to validate request!

  const customer = await customers.findOne( { where: { userName: req.body.userName } } )
  .catch(err => { res.status(500).send({ message: err.message }) })

  const passwordResult = await bcrypt.compare(req.body.password, customer.password) 
  .catch(err => { res.status(500).send({ message: err.message }) })

  if (passwordResult) {
    res.send('Login Sucessfull!')
  }
  else {
    res.send("Password or Username Incorrect")
  }
}


// Find a single Customer with an id
exports.findOrherHistory = async function (req, res, next) {
  const id = req.params.id;

  customers.findByPk(id)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// PUT Methods //
////////////////////

// Update a Customer by the id in the request
exports.updateOrder = async function (req, res, next) {
    const id = req.params.id;

    const customer = await customers.findByPk(id)
    .catch(err => { res.status(500).send({ message: err.message } )})

    const firstName = req.body.firstName ? req.body.firstName : customer.firstName
    const lastName = req.body.lastName ? req.body.lastName : customer.lastName
    const password= req.body.password ? await bcrypt.hash(req.body.password, saltRounds) : customer.password
    const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : customer.phoneNumber

    await customer.update({
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phoneNumber
    })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message } )})
}