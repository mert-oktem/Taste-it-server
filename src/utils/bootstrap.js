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
    const orderStatuses = require("../models/orderStatusesModel")

    const errHandler = (err) => {
        console.error("Error ", err)
    }

    const country = await countries.create({
        countryDescription: "Canada"
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

    const allChoices = await choices.bulkCreate([
        {
            category: "Spiciness",
            choiceDescription: "Very High",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Spiciness",
            choiceDescription: "High",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Spiciness",
            choiceDescription: "Moderate",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Spiciness",
            choiceDescription: "Not Spicy",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Chinese",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "German",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Greek",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Indian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Japanese",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Mediterranean",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Italian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Persian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Russian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Thai",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Ukrainian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Cuisines",
            choiceDescription: "Vietnamese",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Halal",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Kosher",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Vietnamese",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Diabetic",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Vegetarian",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Vegan",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Organic",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Diet Types",
            choiceDescription: "Gluten-Free",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Milk",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Eggs",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Fish (e.g., bass, flounder, cod)",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Crustacean shellfish (e.g., crab, lobster, shrimp)",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Tree nuts (e.g., almonds, walnuts, pecans)",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Wheat",
            pictureURI: "https://www.google.com"
        },
        {   
            category: "Allergens",
            choiceDescription: "Peanuts",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Soybeans",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Soybeans",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Budget",
            choiceDescription: "$6-$10",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Budget",
            choiceDescription: "$10-$15",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Budget",
            choiceDescription: "$15-$20",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Budget",
            choiceDescription: "+$20",
            pictureURI: "https://www.google.com"
        }
    ]).catch(errHandler)

    const allOrderStatuses = await orderStatuses.bulkCreate([
        {
            orderStatusDescription: "Being prepared"
        },
        {
            orderStatusDescription: "Being delivered"
        },
        {
            orderStatusDescription: "Delivered"
        },
        {
            orderStatusDescription: "Reviewed"
        }
    ]).catch(errHandler)
}

