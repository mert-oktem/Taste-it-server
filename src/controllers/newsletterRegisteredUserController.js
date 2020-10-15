const { QueryTypes } = require('sequelize');

// Importing necessary tables
const newsletterRegisteredUsers = require("../models/newsletterRegisteredUsersModel")

////////////////////
// POST Methods ////
////////////////////

// Create and save a new newsletterRegisteredUser
exports.createNewsletterRegisteredUser = async function (req, res, next) {
    // This method needs: email 
    // Add joi function to validate request!
    const emailcheck = await newsletterRegisteredUsers.findOne({where: {email: req.body.email}})
    if (emailcheck != undefined) { return res.send("Email already registered.")}
    
    // Create a newsletterRegisteredUser
    const newsletterRegisteredUser = {
    email: req.body.email
    }

    // Save newsletterRegisteredUser in the database
    newsletterRegisteredUsers.create(newsletterRegisteredUser)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// GET Methods /////
////////////////////

// Find a single newsletterRegisteredUser with an id
exports.findNewsletterRegisteredUser = async function (req, res, next) {
  // This method needs: email
  const emailcheck = await newsletterRegisteredUsers.findOne({where: {email: req.body.email}})
  if (emailcheck == undefined) { return res.send("Email is not found.")}
  
  newsletterRegisteredUsers.findByPk(email)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message }) })
}

////////////////////
// PUT Methods //
////////////////////
