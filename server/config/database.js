/**
 * File is responsible for the connection between
 * the database and the backend of the application.
 */
const mysql = require('mysql2');
let pool;
try {
        pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        connectionLimit: process.env.DB_CONNECTION_LIMIT
    });
} catch(error){
    console.error("Error connecting to Database: "+ error);
}
module.exports = pool;