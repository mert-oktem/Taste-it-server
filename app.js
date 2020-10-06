/******************** Core Modules **********************/
const http = require('http');

/******************** NPM Modules ***********************/
const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');
const { stat } = require('fs');

/******************** Local Modules ***********************/
const db = require("./src/models/index");


/******************** End of Modules ********************/


/******************** App Setup ***********************/

const app = express();

app.use(cors());

// Request Parsing
app.use(bodyParser.json()); // Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded

app.use(express.json());

/******************** DB Setup ***********************/

db.sequelize.sync().then(() => {
    console.log("Sync db.");
});

require("./src/bootstrap")();

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

/******************** Routes ***********************/
//require("./src/routes/customerRoutes")(app);
//require("./app/routes/restaurantRoutes")(app);
//require("./app/routes/orderRoutes")(app);


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



