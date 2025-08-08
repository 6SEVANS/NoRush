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
        return result[0];
    } catch (error) {
        console.error("Unable to fetch User by ID: " + error);
        throw error;
    }
}

/**
 * Inserts a new user into the database.
 * @param {*} displayName Chosen name of the user.
 * @param {*} emailAddress Email address of the user.
 * @param {*} passKey Password of the user.
 * @returns The result of the Insert Query.
 */
const createUser = async (displayName, emailAddress, passKey) => {
    console.log("Create new user query.");
    try {
        let result = await pool 
        .promise()
        .query('INSERT into users (DisplayName, EmailAddress, Passkey) VALUES ' + '(' + pool.escape(displayName) + ',' + pool.escape(emailAddress) + ',' + pool.escape(passKey) + ')');
        return result[0];
    } catch (error) {
        console.error("Unable to create new user: " + error);
        throw error;
    }
}

/**
 * Updates a user based on the ID.
 * @param {*} displayName DisplayName of the user.
 * @param {*} emailAddress Email Address of the user. 
 * @param {*} passKey Passkey of the User.
 * @param {*} id ID of the user.
 * @returns The result of the Update query.
 */
const updateUserByID = async(displayName,emailAddress,passKey,id) => {
    console.log("Update existing user query");
    try {
        let result = await pool 
        .promise()
        .query('UPDATE users SET DisplayName = ' + pool.escape(displayName) + ', EmailAddress = ' + pool.escape(emailAddress) + ', Passkey = ' + pool.escape(passKey) + 'WHERE UserID = ' + pool.escape(id));
        return result[0];
    } catch (error) {
        console.error("Unable to update existing user: " + error);
        throw error;
    }
}

/**
 * Deletes a user based on their ID.
 * @param {*} id UserID of the person to be deleted.
 * @returns The result of the Delete query.
 */
const deleteUserByID = async(id) => {
    console.log("Delete user by ID query");
    try {
        let result = await pool
        .promise()
        .query('DELETE FROM users WHERE UserID = ' + pool.escape(id));
        return result[0];
    } catch (error) {
        console.error("Unable to delete user by ID: " + error);
        throw error;
    }
}

module.exports = {
    getAllUsers, getUserByID, createUser, updateUserByID, deleteUserByID };