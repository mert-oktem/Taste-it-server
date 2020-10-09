module.exports = async (db) => {

    // Importing required tables
    const customers = require("../models/customersModel")
    const restaurants = require("../models/restaurantsModel")
    const customerAddressLinks = require("../models/customerAddressLinkModel")
    const addresses = require("../models/addressesModel")
    const countries = require("../models/countriesModel")
    const cities = require("../models/citiesModel")
    const provinces = require("../models/provincesModel")
    const choices = require("../models/choicesModel")


    const errHandler = (err) => {
        console.error("Error ", err)
    }

    const country = await countries.create({
        countryDescription: "Canada"
    }).catch(errHandler)

    const country = await countries.create({
        countryDescription: "United States"
    }).catch(errHandler)

    const province = await provinces.create({
        provinceDescription: "British Columbia"
    }).catch(errHandler)

    const city = await cities.create({
        cityDescription: "Vancouver"
    }).catch(errHandler)

    const address = await addresses.create({
        countryID: 1,
        provinceID: 1,
        cityID: 1,
        address: "Test Address",
        postcode: "Test Post Code",
        instructions: "Leave at the door.",
        active: 1
    }).catch(errHandler)

    const customer = await customers.create({
        firstName: "Test",
        lastName: "User",
        username: "testusername",
        password: "testpassword",
        email: "test@hotmail.com",
        phoneNumber: "12345678",
        active: 1
    }).catch(errHandler)

    const addressCustomerLink = await customerAddressLinks.create({
        customerID: customer.customerID,
        addressID: address.addressID
    }).catch(errHandler)

    const choice = await choices.create({
        category: "Spice",
        choiceDescription: "Very Spicy",
        pictureURI: "https://www.google.com"
    }).catch(errHandler)

    const choice2 = await choices.create({
        category: "Spice",
        choiceDescription: "Mild Spicy",
        pictureURI: "https://www.google.com"
    }).catch(errHandler)

    const choice3 = await choices.create({
        category: "Spice",
        choiceDescription: "Spicy Options",
        pictureURI: "https://www.google.com"
    }).catch(errHandler)

    const choice4 = await choices.create({
        category: "Cuisines",
        choiceDescription: "Italian",
        pictureURI: "https://www.google.com"
    }).catch(errHandler)
}