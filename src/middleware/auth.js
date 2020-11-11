const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport')


const customers = require("../models/customersModel")
const restaurants = require("../models/restaurantsModel");
const { func } = require('joi');


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
exports.verifyToken = async function (req, res, next) {
    // Get auth header value
    req.token = req.headers['authorization'];

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) { res.status(403).send({ message: err.message }) }
        else { next() }
    });    
}

//  Give Token
exports.customerLogin = async function (req, res, next) {
    // Get customer using username
    const customer = await customers.findOne( { where: { email: req.body.email } } )
    .catch(err => { res.status(500).send({ message: err.message }) })

    if (customer == null) {return res.status(500).send ({ message: "Cannot find customer"})}


    // Get customer password hash comparison
    const passwordResult = await bcrypt.compare(req.body.password, customer.password) 
    .catch(err => { res.status(500).send({ message: err.message }) })


    // Return token
    if (passwordResult) {
        jwt.sign( {customer}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
        })
        .catch(err => { res.status(500).send({ message: err.message }) })
    }
    else {
        res.send("Password incorrect!")
    }
}


exports.customerGoogleSuccess = async function (req, res, next) {
    const customer = await customers.findOne({ where: {email : req.user.email} })

    if (customer == null) {
        // Create a Customer
        const customer = {
            firstName: null,
            lastName: null,
            email: req.user.email,
            phoneNumber: null,
            userType: 'google',
            active: true,
            }
        
            // Save Customer in the database
            customers.create(customer)
            .then(customer => { jwt.sign( {customer}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
            }) } )
            .catch(err => { res.status(500).send({ message: err.message }) })
    }
    else {
        jwt.sign( {customer}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
        })
        .catch(err => { res.status(500).send({ message: err.message }) })
    }
}

exports.customerGoogleFailure = async function (req, res, next) {
    res.send('Login failed')
}

exports.restaurantLogin = async function (req, res, next) {
    // Get restaurant using username
    const restaurant = await restaurants.findOne( { where: { email: req.body.email } } )
    .catch(err => { res.status(500).send({ message: err.message }) })

    // if (restaurant == null) {return res.status(500).send ({ message: "Cannot find restaurant"})}


    // Get restaurant password hash comparison
    const passwordResult = await bcrypt.compare(req.body.password, restaurant.password) 
    .catch(err => { res.status(500).send({ message: err.message }) })


    // Return token
    if (passwordResult) {
        jwt.sign( {restaurant}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
        }).catch(err => { res.status(500).send({ message: err.message }) })
    }
    else {
        res.send("Password incorrect!")
    }
}

exports.restaurantGoogleSuccess = async function (req, res, next) {
    const restaurant = await restaurant.findOne({ where: {email : req.user.email} })

    if (restaurant == null) {
        // Create a Customer
        const restaurant = {
            email: req.user.email,
            userType: 'google',
            active: true,
            }
        
            // Save Customer in the database
            restaurants.create(restaurant)
            .then(restaurant => { jwt.sign( {restaurant}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
            }) } )
            .catch(err => { res.status(500).send({ message: err.message }) })
    }
    else {
        jwt.sign( {restaurant}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
        })
        .catch(err => { res.status(500).send({ message: err.message }) })
    }
}

exports.restaurantGoogleFailure = async function (req, res, next) {
    res.send('Login failed')
}