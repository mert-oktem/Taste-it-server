const { QueryTypes } = require('sequelize');

// Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Salt Rounds for bcrypt (Password hashing)

// Importing necessary tables
const customers = require("../models/customersModel")

const addresses = require("../models/addressesModel")
const countries = require('../models/countriesModel');
const provinces = require("../models/provincesModel")
const cities = require("../models/citiesModel")
const customerAddressLink = require("../models/customerAddressLinkModel")

const choices = require("../models/choicesModel")
const customerChoices = require("../models/customerChoicesModel");

////////////////////
// POST Methods ////
////////////////////

// Create and save a new Customer
exports.createCustomer = async function (req, res, next) {
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

// Create Customer Address
exports.createAddress  = async function (req, res, next) {
  // This method needs: customerID, countryName, provinceName, cityName, postCode, Address, Instructions
  // Add joi function to validate request!

  // Get countryID with countryName
  const country = await countries.findOne({ where: { countryDescription: req.body.countryName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Get provinceID with countryName
  const province = await provinces.findOne({ where: { provinceDescription: req.body.provinceName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Get cityID with countryName
  const city = await cities.findOne({ where: { cityDescription: req.body.cityName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Create Address
  const address = {
    countryID: country.countryID,
    provinceID: province.provinceID,
    cityID: city.cityID,
    address: req.body.address,
    postcode: req.body.postcode,
    instructions: req.body.instructions,
    active: true
  }

  // Save Address in the database
  const createdAddress = await addresses.create(address)
  .catch(err => { res.status(500).send({ message: err.message }) })
  

  // Create Customer Address Link
  const addressCustomerLink = {
    addressID: createdAddress.addressID,
    customerID: req.body.customerID,
  }

  // Save Customer Address Link
  const createdCustomerAddressLink = await customerAddressLink.create(addressCustomerLink)
  .then(data => { res.send(data) } )
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Create customer choice
exports.createChoice = async function (req, res, next) {
  // This method needs: customerID, choiceName
  // Add joi function to validate request!

  // Get choiceID with choiceDescription
  const choice = await choices.findOne({ where: { choiceDescription: req.body.choiceName } })

  // Create choice customer Link
  const customerChoiceLink = {
    choiceID: choice.choiceID,
    customerID: req.body.customerID,
  }

  // Save Customer in the database
  customerChoices.create(customerChoiceLink)
  .then(data => { res.send(data) } )
  .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// GET Methods /////
////////////////////

// Login
exports.login = async function (req, res, next) {
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
exports.findCustomer = async function (req, res, next) {
  const id = req.params.id;

  customers.findByPk(id)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a single customer's choices
exports.findCustomerChoices = async function (req, res, next) {
  const id = req.params.id;

  const choices = await sequelize.query(  
  `SELECT choiceDescription, category 
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${id} and isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a single customer's address
exports.findCustomerAddress = async function (req, res, next) {
  const id = req.params.id;

  const choices = await sequelize.query(  
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
  WHERE customerID = ${id} AND addresses.isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// PUT Methods //
////////////////////

// Update a Customer by the id in the request
exports.updateCustomer = async function (req, res, next) {
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

// Update a Customer's Address by the id in the request
exports.updateCustomerAddress = async function (req, res, next) {
  const id = req.params.id;

  const link = await customerAddressLink.findByPk(id)
  .catch(err => { res.status(500).send({ message: err.message } )})
  const custAddress = await addresses.findOne({ where: {addressID: link.addressID} })
  .catch(err => { res.status(500).send({ message: err.message } )})

  const countryID = req.body.countryID ? await countries.findByPk(req.body.countryDescription).countryID : custAddress.countryID
  const provinceID = req.body.provinceID ? await provinces.findByPk(req.body.provinceDescription).provinceID : custAddress.provinceID
  const cityID = req.body.cityID ? await cities.findByPk(req.body.cityDescription).cityID : custAddress.cityID

  const address = req.body.address ? req.body.address : custAddress.address
  const postcode = req.body.postcode ? req.body.postcode : custAddress.postcode
  const instructions = req.body.instructions ? req.body.instructions : custAddress.instructions

  custAddress.update({
    countryID: countryID,
    provinceID: provinceID,
    cityID: cityID,
    address: address,
    postcode: postcode,
    instructions: instructions
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
};


// Deactive a customer's choices by the id and choiceCategory in the request
exports.deactivateCustomerChoice = async function (req, res, next) {
  // This method needs: customerID, choiceCategory
  const id = req.params.id

  const choices = await sequelize.query(  
    `UPDATE customerChoicesLinks
    LEFT JOIN choices
    ON choices.choiceID = customerChoicesLinks.choiceID
    SET customerChoicesLinks.isActive = false
    WHERE customerChoicesLinks.customerID = ${id} AND customerChoicesLinks.isActive = true AND choices.category = "${req.body.category}"`, { type: QueryTypes.PUT })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) 
  })
}