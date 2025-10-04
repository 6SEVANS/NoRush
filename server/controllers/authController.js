const userModel = require('../models/userModel');
const CustomError = require('../utils/errorHandler');
const asyncHandler = require('../middleware/catchAsyncErrors');
const { string } = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Logins in the user by comparing the entered details against
 * the details stored in the database.
 * @param {*} req DisplayName, EmailAddress, PassKey.
 * @param {*} res Response of the login request.
 */
const loginUser = asyncHandler(async (req, res, next) => {

    //Basic User validation.
    if(!req.body.EmailAddress || !req.body.Passkey){
        return next(new CustomError(400, 'Missing Field.'));
    }
    let databaseUser = await userModel.getUserByEmail(req.body.EmailAddress);
    if(!databaseUser){
        return next(new CustomError(404, 'No account with that email found.'));
    }
   
    //Compare entered passkey against user found in database.
    let passKeyMatch = await bcrypt.compare(req.body.Passkey, databaseUser.Passkey);

    if(!passKeyMatch){
        return next(new CustomError(400, 'Passwords do not match.'));
    } else{

        //Create payload, sign token and then send a 200 Response.
        const payload = {
            id: databaseUser.id,
            username: databaseUser.DisplayName,
            email: databaseUser.EmailAddress
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '8h'});
        res.status(200).json({message: 'Login successful.' , token});
    }
});

/**
 * Registers a user using DisplayName, EmailAddress and Passkey.
 * Creates a new user and signs a new token.
 * @param {*} req DisplayName, EmailAddress, Passkey.
 * @param {*} res Result of user registration. 
 */
const registerUser = asyncHandler(async (req, res, next) => {
    //Basic User Validation.
    if(!req.body.DisplayName || !req.body.EmailAddress || !req.body.Passkey){
        return next(new CustomError(400, 'Missing field.'));
    }
    let databaseUser = await userModel.getUserByEmail(req.body.EmailAddress);
    if(databaseUser){
        return next(new CustomError(400, 'Email already taken.'));
    }
    
    //Create new user and assign JWT, then send success response.
    const newUser = await userModel.createUser(req.body.DisplayName, req.body.EmailAddress, req.body.Passkey);
    const payload = {
        id: newUser.id,
        username: newUser.DisplayName,
        email: newUser.EmailAddress
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '8h'});
    res.status(201).json({message: 'Registered Successfully.', token});
});

module.exports = {loginUser, registerUser};

//authController.js will contain the code for:
// 2.Logging out a user.