/**
 * userController as the intermediary between the userModel
 * and the view/routes.
 */
const userModel = require('../models/userModel');
const CustomError = require('../utils/errorHandler');
const asyncHandler = require('../middleware/catchAsyncErrors');

/**
 * Gets all users in the database.
 * @param {*} req 
 * @param {*} res Result of the request.
 */
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
})

/**
 * Controller for retrieving a user in the database by ID.
 * @param {*} req The ID of the user.
 * @param {*} res Result of the request.
 */
const getUserByID = asyncHandler(async (req, res, next) => {
    const user = await userModel.getUserByID(req.params.UserID);
    if(!user || user.length === 0){
        return next(new CustomError(404, 'User not found.'));
    } 
    res.status(200).json(user);
});

/**
 * Controller for creating a new user.
 * @param {*} req The DisplayName, EmailAddress and Passkey of the new user.
 * @param {*} res Result of the request.
 */
const createUser = asyncHandler(async (req, res, next) => {
    const newUser = await userModel.createUser(req.body.DisplayName, req.body.EmailAddress, req.body.Passkey);
    res.status(201).json(newUser);
});

/**
 * Controller for updating a user by ID.
 * @param {*} req Request containing DisplayName, EmailAddress, Passkey and UserID.
 * @param {*} res Result of the request.
 */
const updateUserByID = asyncHandler(async (req, res, next) => {
    const updatedUser = await userModel.updateUserByID(req.body.DisplayName, req.body.EmailAddress, req.body.Passkey, req.params.UserID);
    if(!updatedUser || updatedUser.length === 0 || req.params.UserID < 0 || req.params.UserID > 10){
        return next(new CustomError(404, 'User not found.'));
    }
    res.status(200).json(updatedUser);
});

/**
 * Controller for deleting a user by ID.
 * @param {*} req Request containing the ID of the User.
 * @param {*} res Result of the request.
 */
const deleteUserByID = asyncHandler(async (req, res, next) => {
    const deletedUser = await userModel.deleteUserByID(req.params.UserID);
    res.status(200).json(deletedUser);
});
module.exports = { getAllUsers, getUserByID, createUser, updateUserByID, deleteUserByID };