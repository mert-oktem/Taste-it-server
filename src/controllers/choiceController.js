const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');

// Importing necessary tables
const choices = require("../models/choicesModel")


////////////////////
// POST Methods ////
////////////////////



////////////////////
// GET Methods /////
////////////////////
exports.findChoices = async function (req, res, next) {
  // This method needs: category
  const category = req.params.category

  choices.findAll({
    where: {
      category: category
    }
  })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

exports.findCategories = async function (req, res, next) {
  choices.findAll({
    attributes: [Sequelize.literal('DISTINCT `category`'), 'category']
  })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

// ////////////////////
// PUT Methods       //
// ////////////////////
