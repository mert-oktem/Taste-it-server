const { QueryTypes } = require('sequelize');

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
  console.log(category)

  choices.findAll({
    where: {
      category: category
    }
  })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}


// ////////////////////
// PUT Methods //
// ////////////////////
