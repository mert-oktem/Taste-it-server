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
}

////////////////////
// GET Methods /////
////////////////////

// Find Order
exports.findOrder = async function (req, res, next) {
}


// Find a single Customer with an id
exports.findOrherHistory = async function (req, res, next) {
}

////////////////////
// PUT Methods //
////////////////////

// Update a Customer by the id in the request
exports.updateOrder = async function (req, res, next) {
}