module.exports = async (db) => {

    // Importing required tables
    const customers = require("../models/customersModel")
    const restaurants = require("../models/restaurantsModel")
    const menus = require("../models/menusModel")
    const menuChoicesLinks = require("../models/menuChoicesLinkModel")
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
            choiceDescription: "French",
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
            choiceDescription: "Fish",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Crustacean shellfish",
            pictureURI: "https://www.google.com"
        },
        {
            category: "Allergens",
            choiceDescription: "Tree nuts",
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

    const fakeRestaurants = await restaurants.bulkCreate([
        {
            restaurantName: "ChongQing Restaurant",
            restaurantDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: "chongqingrestaurant@email.com",
            password: "1234",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Le Crocodile",
            restaurantDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: "lecrocodile@email.com",
            password: "1234",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Stepho's Souvlaki Greek Taverna",
            restaurantDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: "stephossouvlakisreektaverna@email.com",
            password: "1234",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Indian Delicacy",
            restaurantDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: "indiandelicacy@email.com",
            password: "1234",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Zefferelli's Restaurant",
            restaurantDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: "zefferellisrestaurant@email.com",
            password: "1234",
            phoneNumber: "1234",
        }
    ])

    const fakeMenus = await menus.bulkCreate([
        {
            restaurantID: 1,
            menuName: "Hot & Sour Soup With Chicken & Shrimp",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 9.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 1,
            menuName: "Lettuce Wrap",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 16.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 1,
            menuName: "Dai Ching Chicken (With Bone)",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 15.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 1,
            menuName: "General Tso's Chicken",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 16.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 1,
            menuName: "Ginger Beef (Hot & Sweet)",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 15.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 2,
            menuName: "Black Truffle Omelette served with Butter Letter and Pommes Frites",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 24.00,
            pictureURI: "1234"
        },
        {
            restaurantID: 2,
            menuName: "Seared Scallops with Black Linguine & Basil Beurre Blanc",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 26.00,
            pictureURI: "1234"
        },
        {
            restaurantID: 2,
            menuName: "Pan-Fried Dover Sole with Beurre Noisette & Capers",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 48.00,
            pictureURI: "1234"
        },
        {
            restaurantID: 2,
            menuName: "Grilled Beef Tenderloin with Béarnaise",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 42.00,
            pictureURI: "1234"
        },
        {
            restaurantID: 2,
            menuName: "Veal Medallions with Morel Mushroom Sauce",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 42.00,
            pictureURI: "1234"
        },
        {
            restaurantID: 3,
            menuName: "Chicken Souvlaki",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 15.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 3,
            menuName: "Kalamari Dinner",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 16.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 3,
            menuName: "Spanakopita",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 9.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 3,
            menuName: "Roast Lamb",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 18.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 3,
            menuName: "Saganaki Dinner",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 9.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 4,
            menuName: "Butter Chicken",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 13.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 4,
            menuName: "Paneer Spinach Curry",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 13.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 4,
            menuName: "Chicken Tikka Masala",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 14.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 4,
            menuName: "Chicken Dum Biryani",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 13.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 4,
            menuName: "Lamb Tikka",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 15.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 5,
            menuName: "Spaghetti Ragu",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 19.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 5,
            menuName: "Bruschetta",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 8.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 5,
            menuName: "Pizza Margherita",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 15.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 5,
            menuName: "Chicken Parmigiana",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 23.95,
            pictureURI: "1234"
        },
        {
            restaurantID: 5,
            menuName: "Osso Buco",
            menuDescripton: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 32.95,
            pictureURI: "1234"
        },
    ])



    const fakeMenusChoicesLinks = await menuChoicesLinks.bulkCreate([
        //Hot & Sour Soup With Chicken & Shrimp
        {
            choiceID: 2,
            menuID: 1
        },
        {
            choiceID: 5,
            menuID: 1
        },
        {
            choiceID: 27,
            menuID: 1
        },
        {
            choiceID: 25,
            menuID: 1
        },
        {
            choiceID: 31,
            menuID: 1
        },
        //Lettuce Wrap
        {
            choiceID: 4,
            menuID: 2
        },
        {
            choiceID: 5,
            menuID: 2
        },
        {
            choiceID: 20,
            menuID: 2
        },
        {
            choiceID: 30,
            menuID: 2
        },
        //Dai Ching Chicken (With Bone)
        {
            choiceID: 1,
            menuID: 3
        },
        {
            choiceID: 5,
            menuID: 3
        },
        //General Tso's Chicken
        {
            choiceID: 2,
            menuID: 4
        },
        {
            choiceID: 5,
            menuID: 4
        },
        //Ginger Beef (Hot & Sweet)
        {
            choiceID: 1,
            menuID: 5
        },
        {
            choiceID: 5,
            menuID: 5
        },

        //Black Truffle Omelette served with Butter Letter and Pommes Frites
        {
            choiceID: 4,
            menuID: 6
        },
        {
            choiceID: 6,
            menuID: 6
        },
        {
            choiceID: 25,
            menuID: 6
        },
        //Seared Scallops with Black Linguine & Basil Beurre Blanc
        {
            choiceID: 4,
            menuID: 7
        },
        {
            choiceID: 6,
            menuID: 7
        },
        {
            choiceID: 26,
            menuID: 7
        },
        //Pan-Fried Dover Sole with Beurre Noisette & Capers
        {
            choiceID: 4,
            menuID: 8
        },
        {
            choiceID: 6,
            menuID: 8
        },
        {
            choiceID: 20,
            menuID: 8
        },
        //Grilled Beef Tenderloin with Béarnaise
        {
            choiceID: 4,
            menuID: 9
        },
        {
            choiceID: 6,
            menuID: 9
        },
        //Veal Medallions with Morel Mushroom Sauce
        {
            choiceID: 4,
            menuID: 10
        },
        {
            choiceID: 6,
            menuID: 10
        },
        {
            choiceID: 20,
            menuID: 10
        },

        //Chicken Souvlaki
        {
            choiceID: 4,
            menuID: 11
        },
        {
            choiceID: 7,
            menuID: 11
        },
        //Kalamari Dinner
        {
            choiceID: 4,
            menuID: 12
        },
        {
            choiceID: 7,
            menuID: 12
        },
        //Spanakopita
        {
            choiceID: 4,
            menuID: 13
        },
        {
            choiceID: 7,
            menuID: 13
        },
        {
            choiceID: 26,
            menuID: 13
        },
        //Roast Lamb
        {
            choiceID: 4,
            menuID: 14
        },
        {
            choiceID: 7,
            menuID: 14
        },
        //Saganaki Dinner
        {
            choiceID: 4,
            menuID: 15
        },
        {
            choiceID: 7,
            menuID: 15
        },

        //Butter Chicken
        {
            choiceID: 4,
            menuID: 16
        },
        {
            choiceID: 8,
            menuID: 16
        },
        {
            choiceID: 24,
            menuID: 16
        },
        {
            choiceID: 31,
            menuID: 16
        },
        //Paneer Spinach Curry
        {
            choiceID: 3,
            menuID: 17
        },
        {
            choiceID: 8,
            menuID: 17
        },
        {
            choiceID: 20,
            menuID: 17
        },
        //Chicken Tikka Masala
        {
            choiceID: 4,
            menuID: 18
        },
        {
            choiceID: 8,
            menuID: 18
        },
        //Chicken Dum Biryani
        {
            choiceID: 4,
            menuID: 19
        },
        {
            choiceID: 8,
            menuID: 19
        },
        //Lamb Tikka
        {
            choiceID: 4,
            menuID: 20
        },
        {
            choiceID: 8,
            menuID: 20
        },

        //Spaghetti Ragu
        {
            choiceID: 4,
            menuID: 21
        },
        {
            choiceID: 11,
            menuID: 21
        },
        //Bruschetta
        {
            choiceID: 4,
            menuID: 22
        },
        {
            choiceID: 11,
            menuID: 22
        },
        //Pizza Margherita
        {
            choiceID: 4,
            menuID: 23
        },
        {
            choiceID: 11,
            menuID: 23
        },
        {
            choiceID: 20,
            menuID: 23
        },
        //Chicken Parmigiana
        {
            choiceID: 4,
            menuID: 24
        },
        {
            choiceID: 11,
            menuID: 24
        },
        {
            choiceID: 24,
            menuID: 24
        },
        //Osso Buco
        {
            choiceID: 4,
            menuID: 25
        },
        {
            choiceID: 11,
            menuID: 25
        },

    ])
}

