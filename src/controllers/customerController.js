const db = require("../models");
const bcrypt = require('bcrypt');

const customerTable = db.customersTable;
const Op = db.Sequelize.Op;

// Salt Rounds for bcrypt (Password hashing)
const saltRounds = 10;


////////////////////
// POST Methods //
////////////////////

// Create and save a new Customer
exports.create = (req, res) => {
    // Validate request
    // Add joi here!

    // Hash Password
    bcrypt.hash('req.body.password', saltRounds, (err, hash) => {
    try {
        // Create a Customer
        const customer = {
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.email,
        password: hash,
        active: true
        //email: req.body.published ? req.body.published : false
        }

        // Save Customer in the database
        customerTable.create(customer)
        .then(data => { res.send(data) } )
        .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while creating the customer."}) })
    }
    catch {
        console.log(err);
    }
  }) 
}

////////////////////
// GET Methods /////
////////////////////


// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = customerID ? { customerID: { [Op.like]: `%${customerID}%` } } : null
  
    customerTable.findAll({ where: condition })
      .then(data => { res.send(data) })
      .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving customers." })
    })
}

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    customerTable.findByPk(id)
      .then(data => { res.send(data) })
      .catch(err => { res.status(500).send({ message: err.message || "Error retrieving Customer with id=" + id }) })
}

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message || "Some error occurred while retrieving customers." })
    })
}

////////////////////
// PUT Methods //
////////////////////

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    customerTable.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
};

////////////////////
// DELETE Methods //
////////////////////

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
};