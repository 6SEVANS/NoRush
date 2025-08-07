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
module.exports = { getAllUsers, getUserByID };