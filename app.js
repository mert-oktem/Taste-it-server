/******************** Core Modules **********************/
const http = require('http');

/******************** NPM Modules ***********************/
const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');
const { stat } = require('fs');

/******************** Local Modules ***********************/
const routes = require('./src/routes/crmRoutes');
const db = require("./app/models");


/******************** End of Modules ********************/


/******************** App Setup ***********************/

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

/******************** DB Setup ***********************/

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

/******************** Routes ***********************/

require("./app/routes/userRoutes")(app);
//require("./app/routes/restaurantRoutes")(app);
//require("./app/routes/orderRoutes")(app);


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



