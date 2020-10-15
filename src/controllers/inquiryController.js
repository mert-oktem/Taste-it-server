const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// Importing necessary tables
const inquiries = require("../models/inquiriesModel")


////////////////////
// POST Methods ////
////////////////////

// Create and save a new Inquiry
exports.createInquiry = async function (req, res, next) {
    // This method needs: customerID, subject, body
    // Add joi function to validate request!
    const decodedJwt = await jwt.decode(req.token, { complete: true });
    const customerID = decodedJwt.payload.customer.customerID
    
    // Create a Inquiry
    const inquiry = {
    customerID: customerID,
    subject: req.body.subject,
    body: req.body.body
    }

    // Save Inquiry in the database
    inquiries.create(inquiry)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) })
}


////////////////////
// GET Methods /////
////////////////////

// // Find a single Restaurant with an id
// exports.findRestaurant = async function (req, res, next) {
//   // This method needs: token
//   // Find restaurant ID with token
//   const decodedJwt = await jwt.decode(req.token, { complete: true });
//   const restaurantID = decodedJwt.payload.restaurant.restaurantID
  

//   restaurants.findByPk(restaurantID)
//     .then(data => { res.send(data) })
//     .catch(err => { res.status(500).send({ message: err.message }) })
// }


// ////////////////////
// // PUT Methods //
// ////////////////////

// // Update a Restaurant by the id in the request
// exports.updateRestaurant = async function (req, res, next) {
//   // Find restaurant ID with token
//   const decodedJwt = await jwt.decode(req.token, { complete: true });
//   const restaurantID = decodedJwt.payload.restaurant.restaurantID

//   // Find restaurant using restaurantID
//   const restaurant = await restaurants.findByPk(restaurantID)
//   .catch(err => { res.status(500).send({ message: err.message } )})

//   // Check if the req.body contains options, if not use the same record in the db
//   const restaurantName = req.body.restaurantName ? req.body.restaurantName : res.restaurantName
//   const restaurantDescription = req.body.restaurantDescription ? req.body.restaurantDescription : restaurant.restaurantDescription
//   const password= req.body.password ? await bcrypt.hash(req.body.password, saltRounds) : restaurant.password
//   const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : restaurant.phoneNumber

//   await restaurant.update({
//     restaurantName: restaurantName,
//     restaurantDescription: restaurantDescription,
//     password: password,
//     phoneNumber: phoneNumber
//   })
//   .then(data => { res.send(data) })
//   .catch(err => { res.status(500).send({ message: err.message } )})
// }
