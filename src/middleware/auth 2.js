const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const customers = require("../models/customersModel")
const restaurants = require("../models/restaurantsModel")


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