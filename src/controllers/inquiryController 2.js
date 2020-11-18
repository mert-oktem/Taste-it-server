const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

// Importing necessary tables
const inquiries = require("../models/inquiriesModel")


////////////////////
// POST Methods ////
////////////////////

// Create and save a new Inquiry from a customer
exports.createInquiry = async function (req, res, next) {
    // This method needs: name, phoneNumber, email, subject, body
    // Add joi function to validate request!
    
    // Create a Inquiry
    const inquiry = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        subject: req.body.subject,
        body: req.body.body
    }
    
    // Save Inquiry in the database
    inquiries.create(inquiry)
    .then(data => { res.send(data) } )
    .catch(err => { res.status(500).send({ message: err.message }) });
}


////////////////////
// GET Methods /////
////////////////////



// ////////////////////
// PUT Methods //
// ////////////////////

