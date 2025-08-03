/**
 * File is responsible for the connection between
 * the database and the backend of the application.
 */
require('dotenv').config({ path: __dirname + '/config/.env'});

const mysql = require('mysql2/promise')
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;