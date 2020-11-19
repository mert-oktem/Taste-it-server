module.exports = async (db) => {

    // Importing required tables
    const customers = require("../models/customersModel")
    const restaurants = require("../models/restaurantsModel")
    const restaurantAddressLinks = require("../models/restaurantAddressLinkModel")
    const menus = require("../models/menusModel")
    const menuChoicesLinks = require("../models/menuChoicesLinkModel")
    const customerAddressLinks = require("../models/customerAddressLinkModel")
    const customerChoicesLinks = require("../models/customerChoicesModel")
    const addresses = require("../models/addressesModel")
    const countries = require("../models/countriesModel")
    const cities = require("../models/citiesModel")
    const provinces = require("../models/provincesModel")
    const choices = require("../models/choicesModel")
    const orderStatuses = require("../models/orderStatusesModel")
    const orders = require("../models/ordersModel")
    const orderMenuLinks = require("../models/orderMenuLinkModel")


    const errHandler = (err) => {
        console.error("Error ", err)
    }

    const country = await countries.create({
        countryDescription: "Canada"
    }).catch(errHandler)

    const province = await provinces.create({
        provinceDescription: "British Columbia"
    }).catch(errHandler)

    const city = await cities.bulkCreate([
        {cityDescription: "Vancouver"},
        {cityDescription: "Richmond"},
        {cityDescription: "Burnaby"},
        {cityDescription: "North Vancouver"},
    ]).catch(errHandler)

    const address = await addresses.bulkCreate([
        {
            countryID: 1,
            provinceID: 1,
            cityID: 1,
            address: "100 W 49th Ave",
            postcode: "V5Y 2Z6",
            instructions: "Leave at the door.",
            active: 1
        },
        {
            countryID: 1,
            provinceID: 1,
            cityID: 1,
            address: "1130 W Pender St Unit 105",
            postcode: "V6E 4A4",
            active: 1
        },
        {
            countryID: 1,
            provinceID: 1,
            cityID: 1,
            address: "551 Howe St",
            postcode: "V6C 2C2",
            active: 1
        },
        {
            countryID: 1,
            provinceID: 1,
            cityID: 1,
            address: "1773 Robson St",
            postcode: "V6G 1C9",
            active: 1
        },
        {
            countryID: 1,
            provinceID: 1,
            cityID: 1,
            address: "909 Burrard St #100",
            postcode: "V6Z 2N2",
            active: 1
        },
    ]).catch(errHandler)

    const customer = await customers.create({
        firstName: "John",
        lastName: "Doe",
        username: "testusername",
        password: "$2b$10$hLoxlq7y6Pn4nPdKm/nYK.7Aydpf2Rplg0ZHp0GCjknWJtepiovii",
        email: "test@hotmail.com",
        phoneNumber: "12345678",
        active: 1
    }).catch(errHandler)

    const addressCustomerLink = await customerAddressLinks.create({
        customerID: 1,
        addressID: 1
    }).catch(errHandler)

    
    const allChoices = await choices.bulkCreate([
        {
            category: "Spiciness",
            choiceDescription: "Very High",
            pictureURI: "https://i.ibb.co/JHrbsps/very-high.png"
        },
        {
            category: "Spiciness",
            choiceDescription: "High",
            pictureURI: "https://i.ibb.co/jG56ncq/high.png"
        },
        {
            category: "Spiciness",
            choiceDescription: "Moderate",
            pictureURI: "https://i.ibb.co/Y2k55tj/moderate.png"
        },
        {
            category: "Spiciness",
            choiceDescription: "Not Spicy",
            pictureURI: "https://i.ibb.co/wph2BB8/not-spicy.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Indian",
            pictureURI: "https://i.ibb.co/R91348L/Indian.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Vietnamese",
            pictureURI: "https://i.ibb.co/nrDy9Wc/vietnamese.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Japanese",
            pictureURI: "https://i.ibb.co/PxGXKvd/Japanese.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "French",
            pictureURI: "https://i.ibb.co/LRXR2DL/french.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Chinese",
            pictureURI: "https://i.ibb.co/DLJCdx9/chinese.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Mexican",
            pictureURI: "https://i.ibb.co/J274P4Y/Mexican.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Korean",
            pictureURI: "https://i.ibb.co/pKQwt5q/Korean.png"
        },
        {
            category: "Cuisines",
            choiceDescription: "Thai",
            pictureURI: "https://i.ibb.co/bK6CPYG/thai.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Anything",
            pictureURI: "https://i.ibb.co/hDBYYzk/good-heart.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Vegetarian",
            pictureURI: "https://i.ibb.co/1LHkS9V/vegetarian.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Gluten-Free",
            pictureURI: "https://i.ibb.co/vkNvNyB/gluten-free.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Halal",
            pictureURI: "https://i.ibb.co/S0wKSTm/halal.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Kosher",
            pictureURI: "https://i.ibb.co/LkfB5Zc/kosher.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Diabetic",
            pictureURI: "https://i.ibb.co/wzYnwgN/diabetic.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Vegan",
            pictureURI: "https://i.ibb.co/SJQNVZq/vegan.png"
        },
        {
            category: "Diet Types",
            choiceDescription: "Organic",
            pictureURI: "https://i.ibb.co/ph3FHq7/organic.png"
        },
        // 12
        {
            category: "Allergens",
            choiceDescription: "No Allergy",
            pictureURI: "https://i.ibb.co/hDBYYzk/good-heart.png"
        },
        {
            category: "Allergens",
            choiceDescription: "No Allergens",
            pictureURI: "https://i.ibb.co/hDBYYzk/good-heart.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Milk",
            pictureURI: "https://i.ibb.co/3c2zNHw/milk.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Crustacean shellfish",
            pictureURI: "https://i.ibb.co/d4jvWFm/crustacean-shellfish.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Tree nuts",
            pictureURI: "https://i.ibb.co/VDH0bMt/tree-nuts.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Fish",
            pictureURI: "https://i.ibb.co/5rMtbNN/fish.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Eggs",
            pictureURI: "https://i.ibb.co/sHC1Hbk/eggs.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Wheat",
            pictureURI: "https://i.ibb.co/JB2sfgL/wheat.png"
        },
        {   
            category: "Allergens",
            choiceDescription: "Peanuts",
            pictureURI: "https://i.ibb.co/Dk5TzqD/peanuts.png"
        },
        {
            category: "Allergens",
            choiceDescription: "Soybeans",
            pictureURI: "https://i.ibb.co/X3qmqnv/soybeans.png"
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
            orderStatusDescription: "Confirming Order with the restaurant"
        },
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
            restaurantName: "Indian Delicacy",
            restaurantDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            email: "indian@email.com",
            password: "$2b$10$hLoxlq7y6Pn4nPdKm/nYK.7Aydpf2Rplg0ZHp0GCjknWJtepiovii",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Joyeaux Café & Restaurant",
            restaurantDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            email: "vietnamese@email.com",
            password: "$2b$10$hLoxlq7y6Pn4nPdKm/nYK.7Aydpf2Rplg0ZHp0GCjknWJtepiovii",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Saku",
            restaurantDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            email: "japanese@email.com",
            password: "$2b$10$hLoxlq7y6Pn4nPdKm/nYK.7Aydpf2Rplg0ZHp0GCjknWJtepiovii",
            phoneNumber: "1234",
        },
        {
            restaurantName: "Le Crocodile",
            restaurantDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            email: "french@email.com",
            password: "$2b$10$hLoxlq7y6Pn4nPdKm/nYK.7Aydpf2Rplg0ZHp0GCjknWJtepiovii",
            phoneNumber: "1234",
        }
    ]).catch(errHandler)

    const restaurantAddressLink = await restaurantAddressLinks.bulkCreate([
        {
            restaurantID: 1,
            addressID: 2,
        },
        {
            restaurantID: 2,
            addressID: 3,
        },
        {
            restaurantID: 3,
            addressID: 4,
        },
        {
            restaurantID: 4,
            addressID: 5,
        }
    ]).catch(errHandler)

    const fakeMenus = await menus.bulkCreate([
        {
            restaurantID: 1,
            menuName: "Butter Chicken",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 16.00,
            pictureURI: "uploadedImages/menuImages/butter-chicken.jpg"
        },
        {
            restaurantID: 1,
            menuName: "Paneer Spinach Curry",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 16.00,
            pictureURI: "uploadedImages/menuImages/paneer-spinach-curry.jpg"
        },
        {
            restaurantID: 1,
            menuName: "Chicken Tikka Masala",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 17.50,
            pictureURI: "uploadedImages/menuImages/chicken-tikka-masa.jpg"
        },
        {
            restaurantID: 1,
            menuName: "Chicken Dum Biryani",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 17.50,
            pictureURI: "uploadedImages/menuImages/chicken-dumb-biryani.jpg"
        },
        {
            restaurantID: 1,
            menuName: "Lamb Tikka",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 18,
            pictureURI: "uploadedImages/menuImages/lamb-tikka.jpg"
        },
        {
            restaurantID: 2,
            menuName: "Lemongrass Chicken",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 11.75,
            pictureURI: "uploadedImages/menuImages/lemongrass-chicken.jpg"
        },
        {
            restaurantID: 2,
            menuName: "Meat & Shrimp Spring Rolls",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 6.75,
            pictureURI: "uploadedImages/menuImages/meat-shrimp-spring-rolls.jpg"
        },
        {
            restaurantID: 2,
            menuName: "Shredded Crabmeat Noodle Soup",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 10.75,
            pictureURI: "uploadedImages/menuImages/shredded-crabmeat-noodle-soup.jpg"
        },
        {
            restaurantID: 2,
            menuName: "Vegetable Spring Rolls",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 6.75,
            pictureURI: "uploadedImages/menuImages/vegetable-spring-rolls.jpg"
        },
        {
            restaurantID: 2,
            menuName: "Vietnamese Dumplings",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 7.50,
            pictureURI: "uploadedImages/menuImages/vietnamese-dumplings.jpg"
        },
        {
            restaurantID: 3,
            menuName: "Rosu Katsu",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 18.50,
            pictureURI: "uploadedImages/menuImages/rosu-katsu.jpg"
        },
        {
            restaurantID: 3,
            menuName: "Gyudon",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 19,
            pictureURI: "uploadedImages/menuImages/gyudon.jpg"
        },
        {
            restaurantID: 3,
            menuName: "Chicken Karrage",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 14,
            pictureURI: "uploadedImages/menuImages/chicken-karrage.jpg"
        },
        {
            restaurantID: 3,
            menuName: "Takoyaki",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 13.50,
            pictureURI: "uploadedImages/menuImages/takoyaki.jpg"
        },
        {
            restaurantID: 3,
            menuName: "Ebi Chiri",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 13.50,
            pictureURI: "uploadedImages/menuImages/ebi-chiri.jpg"
        },
        {
            restaurantID: 4,
            menuName: "Veal Medallions",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 42.00,
            pictureURI: "uploadedImages/menuImages/veal-medallions.jpg"
        },
        {
            restaurantID: 4,
            menuName: "Grilled Beef Tenderloin",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 48.00,
            pictureURI: "uploadedImages/menuImages/grilled-beef-tenderloin.jpg"
        },
        {
            restaurantID: 4,
            menuName: "Pan-Fried Dover Sole",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 48.00,
            pictureURI: "uploadedImages/menuImages/pan-fried-dover-sole.jpg"
        },
        {
            restaurantID: 4,
            menuName: "Seared Scallops",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 26.00,
            pictureURI: "uploadedImages/menuImages/pan-seared-scallops.jpg"
        },
        {
            restaurantID: 4,
            menuName: "Strawberry Chocolate Bread",
            menuDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            price: 24.00,
            pictureURI: "uploadedImages/menuImages/strawberry-chocolate-bread.jpg"
        },
    ]).catch(errHandler)



    const fakeMenusChoicesLinks = await menuChoicesLinks.bulkCreate([
        // Butter Chicken... Not Spicy, Indian, Gluten Free, No Allergens
        {
            menuID: 1,
            choiceID: 4
        },
        {
            menuID: 1,
            choiceID: 5
        },
        {
            menuID: 1,
            choiceID: 11
        },
        {
            menuID: 1,
            choiceID: 13
        },
        // Paneer Spinach Curry... High, Indian, Vegetarian, No Allergens
        {
            menuID: 2,
            choiceID: 2
        },
        {
            menuID: 2,
            choiceID: 5
        },
        {
            menuID: 2,
            choiceID: 10
        },
        {
            menuID: 2,
            choiceID: 13
        },
        // Chicken Tikka Masala... Moderate, Indian, Anything, No Allergens
        {
            menuID: 3,
            choiceID: 3
        },
        {
            menuID: 3,
            choiceID: 5
        },
        {
            menuID: 3,
            choiceID: 9
        },
        {
            menuID: 3,
            choiceID: 13
        },
        // Chicken Dum Biryani... Moderate, Indian, Gluten-Free, No Allergens
        {
            menuID: 4,
            choiceID: 3
        },
        {
            menuID: 4,
            choiceID: 5
        },
        {
            menuID: 4,
            choiceID: 10
        },
        {
            menuID: 4,
            choiceID: 13
        },
        // Lamb Tikka... Not Spicy, Indian, Anything, No Allergens
        {
            menuID: 5,
            choiceID: 4
        },
        {
            menuID: 5,
            choiceID: 5
        },
        {
            menuID: 5,
            choiceID: 9
        },
        {
            menuID: 5,
            choiceID: 13
        },
        // Lemongrass Chicken... Not Spicy, Vietnamese, Anything, Tree Nuts
        {
            menuID: 6,
            choiceID: 4
        },
        {
            menuID: 6,
            choiceID: 6
        },
        {
            menuID: 6,
            choiceID: 9
        },
        {
            menuID: 6,
            choiceID: 16
        },
        // Meat & Shrimp Spring Rolls... High, Vietnamese, Anything, Crustacean Shellfish
        {
            menuID: 7,
            choiceID: 2
        },
        {
            menuID: 7,
            choiceID: 6
        },
        {
            menuID: 7,
            choiceID: 9
        },
        {
            menuID: 7,
            choiceID: 15
        },
        // Shredded Crabmeat Shrimp Noodle Soup... Not Spicy, Vietnamese, Anything, No Allergens
        {
            menuID: 8,
            choiceID: 4
        },
        {
            menuID: 8,
            choiceID: 6
        },
        {
            menuID: 8,
            choiceID: 9
        },
        {
            menuID: 8,
            choiceID: 13
        },
        // Vegetable Spring Rolls... Very High, Vietnamese, Vegetarian, Tree Nuts
        {
            menuID: 9,
            choiceID: 1
        },
        {
            menuID: 9,
            choiceID: 6
        },
        {
            menuID: 9,
            choiceID: 10
        },
        {
            menuID: 9,
            choiceID: 16
        },
        // Vietnamese Dumplings... Not Spicy, Vietnamese, Vegetarian, No Allergens
        {
            menuID: 10,
            choiceID: 4
        },
        {
            menuID: 10,
            choiceID: 6
        },
        {
            menuID: 10,
            choiceID: 10
        },
        {
            menuID: 10,
            choiceID: 13
        },
        // Rosu Katsu... Not Spicy, Japanese, Anything, No Allergens
        {
            menuID: 11,
            choiceID: 4
        },
        {
            menuID: 11,
            choiceID: 7
        },
        {
            menuID: 11,
            choiceID: 9
        },
        {
            menuID: 11,
            choiceID: 13
        },
        // Gyudon... Not Spicy, Japanese, Anything, No Allergens
        {
            menuID: 12,
            choiceID: 4
        },
        {
            menuID: 12,
            choiceID: 7
        },
        {
            menuID: 12,
            choiceID: 9
        },
        {
            menuID: 12,
            choiceID: 13
        },
        // Chicken Karrage... Moderate, Japanese, Anything, No Allergens
        {
            menuID: 13,
            choiceID: 3
        },
        {
            menuID: 13,
            choiceID: 7
        },
        {
            menuID: 13,
            choiceID: 9
        },
        {
            menuID: 13,
            choiceID: 13
        },
        // Takoyaki... Not Spicy, Japanese, Anything, No Allergens
        {
            menuID: 14,
            choiceID: 4
        },
        {
            menuID: 14,
            choiceID: 7
        },
        {
            menuID: 14,
            choiceID: 9
        },
        {
            menuID: 14,
            choiceID: 13
        },
        // Ebi Chiri... High, Japanese, Anything, Crustacean Shellfish
        {
            menuID: 15,
            choiceID: 1
        },
        {
            menuID: 15,
            choiceID: 7
        },
        {
            menuID: 15,
            choiceID: 9
        },
        {
            menuID: 15,
            choiceID: 15
        },
        // Veal Medallions with Morel Mushroom Sauce... Not Spicy, French, Anything, Milk
        {
            menuID: 16,
            choiceID: 4
        },
        {
            menuID: 16,
            choiceID: 8
        },
        {
            menuID: 16,
            choiceID: 9
        },
        {
            menuID: 16,
            choiceID: 14
        },
        // Grilled Beef Tenderloin with Béarnaise... Not Spicy, French, Gluten Free, Milk
        {
            menuID: 17,
            choiceID: 4
        },
        {
            menuID: 17,
            choiceID: 8
        },
        {
            menuID: 17,
            choiceID: 11
        },
        {
            menuID: 17,
            choiceID: 14
        },
        // Pan-Fried Dover Sole with Beurre Noisette & Capers... Not Spicy, French, Anything, Fish
        {
            menuID: 18,
            choiceID: 4
        },
        {
            menuID: 18,
            choiceID: 8
        },
        {
            menuID: 18,
            choiceID: 9
        },
        {
            menuID: 18,
            choiceID: 17
        },
        // Seared Scallops with Black Linguine & Basil Beurre Blanc ... Not Spicy, French, Gluten Free, Crustacean Shellfish
        {
            menuID: 19,
            choiceID: 4
        },
        {
            menuID: 19,
            choiceID: 8
        },
        {
            menuID: 19,
            choiceID: 11
        },
        {
            menuID: 19,
            choiceID: 15
        },
        // Black Truffle Omelette served with Butter Letter and Pommes Frites ... Not Spicy, French, Anything, Milk
        {
            menuID: 20,
            choiceID: 4
        },
        {
            menuID: 20,
            choiceID: 8
        },
        {
            menuID: 20,
            choiceID: 9
        },
        {
            menuID: 20,
            choiceID: 14
        },
    ]).catch(errHandler)

const fakeOrders = await orders.bulkCreate([
    {
        customerID: 1,
        orderStatusID: 1,
        forHowManyPeople: 1,
    },
    {
        customerID: 1,
        orderStatusID: 2,
        forHowManyPeople: 1,
        estimatedDeliveryTime: 20,
    },
    {
        customerID: 1,
        orderStatusID: 3,
        forHowManyPeople: 2,
        estimatedDeliveryTime: 30,
    },
    {
        customerID: 1,
        orderStatusID: 4,
        forHowManyPeople: 2,
        estimatedDeliveryTime: 40,
    },
    {
        customerID: 1,
        orderStatusID: 5,
        forHowManyPeople: 2,
        estimatedDeliveryTime: 40,
        review: "It was tasty and wanna order again!",
        rate: 5,
        isOrderAgain: true
    },
]).catch(errHandler)

const customerChoicesLink = await customerChoicesLinks.bulkCreate([
    // John Doe ... Not Spicy, Japanese, Indian, French, Anything, Crustacean Shellfish
    {
        customerID: 1,
        choiceID: 4
    },
    {
        customerID: 1,
        choiceID: 5
    },
    {
        customerID: 1,
        choiceID: 7
    },
    {
        customerID: 1,
        choiceID: 8
    },
    {
        customerID: 1,
        choiceID: 9
    },
    {
        customerID: 1,
        choiceID: 15
    },
]).catch(errHandler)

const orderMenuLink = await orderMenuLinks.bulkCreate([
    {
        orderID: 1,
        menuID: 1
    },
    {
        orderID: 2,
        menuID: 2
    },
    {
        orderID: 3,
        menuID: 3
    },
    {
        orderID: 4,
        menuID: 4
    },
    {
        orderID: 5,
        menuID: 5
    },
]).catch(errHandler)

}