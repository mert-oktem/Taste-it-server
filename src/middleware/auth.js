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
    // // Check if bearer is undefined
    // if (typeof bearerHeader !== 'undefined') {
    //     // Split at the space
    //     const bearer = bearerHeader.split(' ');
    //     console.log(bearer)

    //     // Get token from array
    //     const bearerToken = bearer[1];
    //     console.log(bearerToken)
    //     // Set the token
    //     req.token = bearerToken;        
    //     console.log(req.token)
    // }
    // else {
    //     // Forbidden
    //     res.status(403).send({ message: err.message });
    // }
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) { res.status(403).send({ message: err.message }) }
        else { next() }
    });
}

// Give Token
exports.customerLogin = async function (req, res, next) {
    // Get customer using username
    const customer = await customers.findOne( { where: { email: req.body.email } } )
    .catch(err => { res.status(500).send({ message: err.message }) })


    // Get customer password hash comparison
    const passwordResult = await bcrypt.compare(req.body.password, customer.password) 
    .catch(err => { res.status(500).send({ message: err.message }) })

    // Return result
    if (passwordResult) {
        jwt.sign( {customer}, 'secretkey', {expiresIn: '24h'}, (err, token) => {
            res.json( { token } ) 
        })
        .catch(err => { res.status(500).send({ message: err.message }) })
    }
    else {
        res.send("Password or Username Incorrect")
    }
}