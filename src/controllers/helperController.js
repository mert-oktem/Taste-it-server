const { QueryTypes } = require('sequelize');

// Importing necessary tables
const countries = require('../models/countriesModel')
const provinces = require("../models/provincesModel")
const cities = require("../models/citiesModel")
const choices = require("../models/choicesModel")
const orderStatuses = require("../models/orderStatusesModel")

////////////////////
// POST Methods ////
////////////////////


////////////////////
// GET Methods /////
////////////////////

// Retrieve a list of countries options
exports.findCountries = async function (req, res, next) {
  countries.findAll()
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of provinces options
exports.findProvinces = async function (req, res, next) {
  provinces.findAll()
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of cities options
exports.findCities = async function (req, res, next) {
  cities.findAll()
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of cuisines options
exports.findCuisines = async function (req, res, next) {
  choices.findAll({
    where: {
      category: 'Cuisines'
    }
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of allergens options
exports.findAllergens = async function (req, res, next) {
  choices.findAll({
    where: {
      category: 'Allergens'
    }
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of diet type options
exports.findDietTypes = async function (req, res, next) {
  choices.findAll({
    where: {
      category: 'Diet Types'
    }
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of spiciness options
exports.findSpiciness = async function (req, res, next) {
  choices.findAll({
    where: {
      category: 'Spiciness'
    }
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of budgets options
exports.findBudgets = async function (req, res, next) {
  choices.findAll({
    where: {
      category: 'Budget'
    }
  })
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// Retrieve a list of order status options
exports.findOrderStatus = async function (req, res, next) {
  orderStatuses.findAll()
  .then(data => { res.send(data) })
  .catch(err => { res.status(500).send({ message: err.message }) })
}

// ////////////////////
// PUT Methods //
// ////////////////////

