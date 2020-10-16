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



// ////////////////////
// PUT Methods //
// ////////////////////

