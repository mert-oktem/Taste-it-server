module.exports = async () => {
    const customersTable = require("./models/customerModel")
    //const restaurantsTable = require()

    const customerAddressLink = require("./models/customerAddressLink")
    //const restaurantAdressLink = require()

    const addressesTable = require("./models/addressesTable")
    const countriesTable = require("./models/countriesTable")
    const citiesTable = require("./models/citiesTable")
    const provincesTable = require("./models/provincesTable")

    //addressesTable.hasMany(countriesTable, { as: "countriesTable", foreignKey: 'countryID'})
    //addressesTable.hasMany(citiesTable, { as: "citiesTable", foreignKey: 'cityID'})
    //addressesTable.hasMany(provincesTable, { as: "provincesTable", foreignKey: 'provinceID'})

    customerAddressLink.hasMany(customersTable, { as: "customersTable", foreignKey: 'customerID'})
    customerAddressLink.hasMany(addressesTable, { as: "addressesTable", foreignKey: 'addressID'})

    const errHandler = (err) => {
        console.error("Error ", err)
    }

    const country = await countriesTable.create({
        countryDescription: "Canada"
    }.catch(errHandler))

    const province = await provincesTable.create({
        provinceDescripton: "British Columbia"
    }.catch(errHandler))

    const city = await citiesTable.create({
        cityDescription: "Vancouver"
    }.catch(errHandler))

    const address = await addressesTable.create({
        countryID: 0,
        provinceID: 0,
        cityID: 0,
        address: "1379 Park Drive",
        postcode: "V6P 2K4",
        instructions: "Leave at the door.",
        active: 1
    }.catch(errHandler))

    const customer = await customersTable.create({
        firstName: "Mert",
        lastName: "Oktem",
        username: "mertoktem",
        password: "password",
        email: "mrtoktem@hotmail.com",
        phoneNumber: 6043629418,
        active: 1
    }.catch(errHandler))

    const addressCustomerLink = await customerAddressLink.create({
        customerID: customer.customerID,
        addressID: address.addressID
    }.catch(errHandler))



    


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