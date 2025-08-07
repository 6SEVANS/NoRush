/**
 * The model for the users table in the NoRush database.
 * Contains logic for queries to the database in relation to the users table.
 */
const pool = require('../config/database');

/**
 * Fetches all users from the database.
 * @returns A list of Users or an error.
 */
const getAllUsers = async () => {
    console.log("Get all users query.");
    try {
        let results = await pool
        .promise()
        .query('SELECT * FROM users');
        return results[0];
    } catch (error) {
        console.error("Unable to fetch all users: " + error);
        throw error;
    }
}

/**
 * Fetches a single user by their unique ID.
 * @param {*} id ID of the user to look up.
 * @returns The details of the user searched by ID, or an error.
 */
const getUserByID = async (id) => {
    console.log("Get user by ID query.");
    try {
        let result = await pool
        .promise()
        .query('SELECT * FROM users WHERE UserID = ' + pool.escape(id));
        console.log(result[0]);
        return result[0];
    } catch (error) {
        console.error("Unable to fetch User by ID: " + error);
        throw error;
    }
}
module.exports = {
    getAllUsers, getUserByID
};