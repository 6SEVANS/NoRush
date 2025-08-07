/**
 * Server.js acts as the main entry point and 
 * configuration file for the backend of the app.
 */
const express = require('express');
const cors = require('cors');

//Obtain and use port from .env file.
require('dotenv').config({ path: __dirname + '/config/.env'});
const port = process.env.PORT;

//Set up and configure the app.
const app = express();
app.use(cors());
app.use(express.json());

//Declare and use routes relating to Users.
const v1UserRoutes = require('./routes/users');
app.use('/api/v1/users', v1UserRoutes);

app.listen(port, (error) => {
    if(error){
        return console.error(error);
    }
    return console.log('NoRush listening on port ' + port);
});
module.exports = app;