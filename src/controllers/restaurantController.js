const { QueryTypes } = require('sequelize');

// Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Salt Rounds for bcrypt (Password hashing)

// JWT
const jwt = require('jsonwebtoken');

// Importing necessary tables
const restaurants = require("../models/restaurantsModel")

const addresses = require("../models/addressesModel")
const countries = require('../models/countriesModel');
const provinces = require("../models/provincesModel")
const cities = require("../models/citiesModel")
const restaurantAddressLink = require("../models/restaurantAddressLinkModel")


////////////////////
// POST Methods ////
////////////////////

// Create and save a new Restaurant
exports.createRestaurant = async function (req, res, next) {
    // This method needs: restaurantName, restaurantDescription, email, password, phoneNumber, 
    // Add joi function to validate request!
    const emailcheck = await restaurants.findOne({where: {email: req.body.email}})
    if (emailcheck != undefined) { return res.send("Email already registered.")}

    // Hash Password
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    
    // Create a Restaurant
    const restaurant = {
    restaurantName: req.body.restaurantName,
    restaurantDescription: req.body.restaurantDescription,
    email: req.body.email,
    password: hash,
    phoneNumber: req.body.phoneNumber,
    active: true
    }

    // Save Restaurant in the database
    restaurants.create(restaurant)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// Create Restaurant Address
exports.createAddress  = async function (req, res, next) {
  // This method needs: restaurantID, countryName, provinceName, cityName, postCode, Address
  // Add joi function to validate request!

  // Get countryID using countryName
  const country = await countries.findOne({ where: { countryDescription: req.body.countryName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Get provinceID using countryName
  const province = await provinces.findOne({ where: { provinceDescription: req.body.provinceName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Get cityID using countryName
  const city = await cities.findOne({ where: { cityDescription: req.body.cityName } })
  .catch(err => { res.status(500).send({ message: err.message }) })

  // Create Address
  const address = {
    countryID: country.countryID,
    provinceID: province.provinceID,
    cityID: city.cityID,
    address: req.body.address,
    postcode: req.body.postcode,
    instructions: null,
    active: true
  }

  // Save Address in the database
  const createdAddress = await addresses.create(address)
  .catch(err => { res.status(500).send({ message: err.message }) })
  
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID
  
  // Create Restaurant Address Link
  const addressRestaurantLink = {
    addressID: createdAddress.addressID,
    restaurantID: restaurantID,
  }

  // Save Restaurant Address Link
  const createdRestaurantAddressLink = await restaurantAddressLink.create(addressRestaurantLink)
  .then(data => { res.send(data) } )
  .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// GET Methods /////
////////////////////

// Find a single Restaurant with an id
exports.findRestaurant = async function (req, res, next) {
  // This method needs: token
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID
  

  restaurants.findByPk(restaurantID)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}


// Find a single restaurant's address
exports.findRestaurantAddress = async function (req, res, next) {
  // This method needs: token
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID

  const choices = await sequelize.query(  
  `SELECT countryDescription, provinceDescription, cityDescription, address, postcode, instructions 
  FROM addresses
  LEFT JOIN restaurantAddressLinks
  ON restaurantAddressLinks.addressID = addresses.addressID
  LEFT JOIN countries
  ON countries.countryID = addresses.countryID
  LEFT JOIN provinces
  ON provinces.provinceID = addresses.provinceID
  LEFT JOIN cities
  ON cities.cityID = addresses.cityID
  WHERE restaurantID = ${restaurantID} AND addresses.isActive=true`, { type: QueryTypes.SELECT })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// PUT Methods //
////////////////////

// Update a Restaurant by the id in the request
exports.updateRestaurant = async function (req, res, next) {
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID

  // Find restaurant using restaurantID
  const restaurant = await restaurants.findByPk(restaurantID)
  .catch(err => { res.status(500).send({ message: err.message } )})

  // Check if the req.body contains options, if not use the same record in the db
  const restaurantName = req.body.restaurantName ? req.body.restaurantName : res.restaurantName
  const restaurantDescription = req.body.restaurantDescription ? req.body.restaurantDescription : restaurant.restaurantDescription
  const password= req.body.password ? await bcrypt.hash(req.body.password, saltRounds) : restaurant.password
  const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : restaurant.phoneNumber

  await restaurant.update({
    restaurantName: restaurantName,
    restaurantDescription: restaurantDescription,
    password: password,
    phoneNumber: phoneNumber
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
}

// Update a Restaurant's Address by the id in the request
exports.updateRestaurantAddress = async function (req, res, next) {
  // This method needs: token, countryDescription, provinceDescription, cityDescription, address, postcode
  // If you don't send any of the options above it keeps the old record for that column!
  // Find restaurant ID with token
  const decodedJwt = await jwt.decode(req.token, { complete: true });
  const restaurantID = decodedJwt.payload.restaurant.restaurantID

  // Get restaurant-address-link using restaurantID
  const link = await restaurantAddressLink.findByPk(restaurantID)
  .catch(err => { res.status(500).send({ message: err.message } )})
  // Get restaurant's addressID using restaurant-address-link
  const restaurantAddress = await addresses.findOne({ where: {addressID: link.addressID} })
  .catch(err => { res.status(500).send({ message: err.message } )})

  // Check if the req.body contains options, if not use the same record in the db
  const countryID = req.body.countryID ? await countries.findByPk(req.body.countryDescription).countryID : restaurantAddress.countryID
  const provinceID = req.body.provinceID ? await provinces.findByPk(req.body.provinceDescription).provinceID : restaurantAddress.provinceID
  const cityID = req.body.cityID ? await cities.findByPk(req.body.cityDescription).cityID : restaurantAddress.cityID
  const address = req.body.address ? req.body.address : restaurantAddress.address
  const postcode = req.body.postcode ? req.body.postcode : restaurantAddress.postcode

  restaurantAddress.update({
    countryID: countryID,
    provinceID: provinceID,
    cityID: cityID,
    address: address,
    postcode: postcode
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message } )})
};
