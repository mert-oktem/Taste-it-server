/******************** Core Modules **********************/
const http = require('http');
const cookieSession = require('cookie-session')

/******************** NPM Modules ***********************/
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')

const cors = require('cors');
const { stat } = require('fs');

require('./src/middleware/passportSetup')

/******************** End of Modules ********************/


/******************** DB Connection ***********************/
require("./src/database/connection");


/******************** App Setup ***********************/
global.__basedir = __dirname;

const app = express();

app.use(cors());

// Request Parsing
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieSession({
    name: 'tasteit-session',
    keys: ['key1', 'key2']
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());

// Bootstrap for creating DB tables and relations.
//require("./src/utils/bootstrap")(); 


const port = process.env.port || 5000;

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${port}`)
);

/******************** Routes ***********************/
require("./src/routes/customerRoutes")(app);
require("./src/routes/orderRoutes")(app);
require("./src/routes/menuRoutes")(app);
require("./src/routes/restaurantRoutes")(app);
require("./src/routes/inquiryRoutes")(app);
require("./src/routes/newsletterRegisteredUserRoutes")(app);
require("./src/routes/choiceRoutes")(app);
require("./src/routes/helperRoutes")(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));



