const { QueryTypes } = require('sequelize');

// Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Salt Rounds for bcrypt (Password hashing)

// JWT
const jwt = require('jsonwebtoken');

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
    const emailcheck = await customers.findOne({where: {email: req.body.email}})
    if (emailcheck != undefined) { return res.send("Email already registered.")}

    // Hash Password
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    
    // Create a Customer
    const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    phoneNumber: req.body.phoneNumber,
    active: true,
    }

    // Save Customer in the database
    customers.create(customer)
    .then(customer => { jwt.sign( {customer}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
      res.json( { token } ) 
    }) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Create Customer Address
exports.createAddress  = async function (req, res, next) {
  // This method needs: customerID, countryName, provinceName, cityName, postCode, Address, Instructions
  // Add joi function to validate request!

  // Get provinceID using countryName
  const province = await provinces.findOne({ where: { provinceDescription: req.body.provinceName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Get cityID using countryName
  const city = await cities.findOne({ where: { cityDescription: req.body.cityName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Create Address
  const address = {
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
  
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID

  // Create Customer Address Link
  const addressCustomerLink = {
    addressID: createdAddress.addressID,
    customerID: customerID,
  }

  // Save Customer Address Link
  const createdCustomerAddressLink = await customerAddressLink.create(addressCustomerLink)
  .then(data => { res.send(data) } )
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Create customer choice
exports.createChoice = async function (req, res, next) {
  // This method needs: token, choiceName
  // Add joi function to validate request!

  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID

  // Get choiceID using choiceDescription
  const choice = await choices.findOne({ where: { choiceDescription: req.body.choiceName } })

  // Create choice customer-choice-Link
  const customerChoiceLink = {
    choiceID: choice.choiceID,
    customerID: customerID,
  }

  // Save customer-choice-link in the database
  customerChoices.create(customerChoiceLink)
  .then(data => { res.send(data) } )
  .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// GET Methods /////
////////////////////

// Find a single Customer with an id
exports.findCustomer = async function (req, res, next) {
  // This method needs: token
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID
  
  customers.findByPk(customerID)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a single customer's choices
exports.findCustomerChoices = async function (req, res, next) {
  // This method needs: token
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID

  await sequelize.query(  
  `SELECT choiceDescription, category 
  FROM choices
  LEFT JOIN customerChoicesLinks
  ON choices.choiceID = customerChoicesLinks.choiceID
  WHERE customerID = ${customerID} and isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Find a single customer's address
exports.findCustomerAddress = async function (req, res, next) {
  // This method needs: token
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID
  console.log(customerID)
  await sequelize.query(  
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
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// PUT Methods //
////////////////////

// Update a Customer by the id in the request
exports.updateCustomer = async function (req, res, next) {
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID

  // Find customer using customerID
  const customer = await customers.findByPk(customerID)
  .catch(err => { res.status(500).send({ message: err.message } )})

  // Check if the req.body contains options, if not use the same record in the db
  const firstName = req.body.firstName ? req.body.firstName : customer.firstName
  const lastName = req.body.lastName ? req.body.lastName : customer.lastName
  const password= req.body.password ? await bcrypt.hash(req.body.password, saltRounds) : customer.password
  const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : customer.phoneNumber
  const email = req.body.email ? req.body.email : customer.email
  const active = req.body.active ? req.body.active : customer.active

  await customer.update({
    firstName: firstName,
    lastName: lastName,
    password: password,
    phoneNumber: phoneNumber,
    email: email,
    active: active
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
}

// Update a Customer's Address by the id in the request
exports.updateCustomerAddress = async function (req, res, next) {
  // This method needs: token, countryDescription, provinceDescription, cityDescription, address, postcode, instructions
  // If you don't send any of the options above it keeps the old record for that column!
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID
  
  // Get customer-address-link using customerID
  const link = await customerAddressLink.findOne({ where: {customerID: customerID} })
  .catch(err => { res.status(500).send({ message: err.message } )})
  // Get customer's addressID using customer-address-link
  const custAddress = await addresses.findOne({ where: {addressID: link.addressID} })
  .catch(err => { res.status(500).send({ message: err.message } )})

  const newProvince = await provinces.findOne({ where: {provinceDescription : req.body.provinceName} })
  const newCity = await cities.findOne({ where: {cityDescription : req.body.cityName} })

  // Check if the req.body contains options, if not use the same record in the db
  const provinceID = req.body.provinceName ? newProvince.dataValues.provinceID : custAddress.provinceID
  const cityID = req.body.cityName ? newCity.dataValues.cityID : custAddress.cityID
  

  const address = req.body.address ? req.body.address : custAddress.address
  const postcode = req.body.postcode ? req.body.postcode : custAddress.postcode
  const instructions = req.body.instructions ? req.body.instructions : custAddress.instructions

  custAddress.update({
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
  // This method needs: token, choiceCategory
  // Find customer ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const customerID = decodedJwt.payload.customer.customerID

  await sequelize.query(  
    `UPDATE customerChoicesLinks
    LEFT JOIN choices
    ON choices.choiceID = customerChoicesLinks.choiceID
    SET customerChoicesLinks.isActive = false
    WHERE customerChoicesLinks.customerID = ${customerID} AND customerChoicesLinks.isActive = true`, { type: QueryTypes.PUT })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) 
  })
}