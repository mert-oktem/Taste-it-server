module.exports = async (db) => {
    const customers = require("../models/customersModel")
    //const restaurantsTable = require()

    const customerAddressLinks = require("../models/customerAddressLinkModel")
    //const restaurantAdressLink = require()

    const addresses = require("../models/addressesModel")
    const countries = require("../models/countriesModel")
    const cities = require("../models/citiesModel")
    const provinces = require("../models/provincesModel")

    addresses.hasMany(countries, { as: "countriesModel", foreignKey: 'countryID'})
    addresses.hasMany(cities, { as: "citiesModel", foreignKey: 'cityID'})
    addresses.hasMany(provinces, { as: "provincesModel", foreignKey: 'provinceID'})

    customerAddressLinks.hasMany(customers, { as: "customers", foreignKey: 'customerID'})
    customerAddressLinks.hasMany(addresses, { as: "addresses", foreignKey: 'addressID'})

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
        address: "1379 Park Drive",
        postcode: "V6P 2K4",
        instructions: "Leave at the door.",
        active: 1
    }).catch(errHandler)

    const customer = await customers.create({
        firstName: "Mert",
        lastName: "Oktem",
        username: "mertoktem",
        password: "password",
        email: "mrtoktem@hotmail.com",
        phoneNumber: 6043629418,
        active: 1
    }).catch(errHandler)

    const addressCustomerLink = await customerAddressLinks.create({
        customerID: customer.customerID,
        addressID: address.addressID
    }).catch(errHandler)


    /*
    const customerChoicesLink = require()
    const choicesTable = require()

    const menusTable = require()
    const menuCHoicesLink = require()

    const orderMenuLink = require()
    const ordersTable = require()
    const orderStatusTable = require()
    const orderHistoriesTable = require()


    const newsRegisteredUsersTable = require()
    const inquriesTable = require()
    */
}