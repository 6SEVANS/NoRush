/**
 * userController as the intermediary between the userModel
 * and the view/routes.
 */
const userModel = require('../models/userModel');

/**
 * Gets all users in the database.
 * @param {*} req 
 * @param {*} res Result of the request.
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
};

/**
 * Controller for retrieving a user in the database by ID.
 * @param {*} req The ID of the user.
 * @param {*} res Result of the request.
 */
const getUserByID = async (req, res) => {
    try {
        const user = await userModel.getUserByID(req.params.UserID);
        // Checks if user exists.
        if(!user || user.length === 0){
            return res.status(404).json({message: 'User not found.'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
}

/**
 * Controller for creating a new user.
 * @param {*} req The DisplayName, EmailAddress and Passkey of the new user.
 * @param {*} res Result of the request.
 */
const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body.DisplayName, req.body.EmailAddress, req.body.Passkey);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
}

/**
 * Controller for updating a user by ID.
 * @param {*} req Request containing DisplayName, EmailAddress, Passkey and UserID.
 * @param {*} res Result of the request.
 */
const updateUserByID = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUserByID(req.body.DisplayName, req.body.EmailAddress, req.body.Passkey, req.params.UserID);
        if(!updatedUser ||updatedUser.length === 0){
            res.status(404).json({message: 'User not found.'});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
}

/**
 * Controller for deleting a user by ID.
 * @param {*} req Request containing the ID of the User.
 * @param {*} res Result of the request.
 */
const deleteUserByID = async(req, res) => {
    try {
        const deletedUser = await userModel.deleteUserByID(req.params.UserID);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
}
module.exports = { getAllUsers, getUserByID, createUser, updateUserByID, deleteUserByID };