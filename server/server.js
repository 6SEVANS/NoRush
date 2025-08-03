/**
 * Server.js acts as the main entry point and 
 * configuration file for the backend of the app.
 */

const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
})