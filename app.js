/******************** Core Modules **********************/
const http = require('http');

/******************** NPM Modules ***********************/
const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');
const { stat } = require('fs');

/******************** End of Modules ********************/


/******************** DB Connection ***********************/
require("./src/database/connection");


/******************** App Setup ***********************/

const app = express();

app.use(cors());

// Request Parsing
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());

// Bootstrap for creating DB tables and relations.
//require("./src/utils/bootstrap")(); 


const port = process.env.port || 3000;

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${port}`)
);

/******************** Routes ***********************/
require("./src/routes/customerRoutes")(app);
//require("./app/routes/restaurantRoutes")(app);
//require("./app/routes/orderRoutes")(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));



