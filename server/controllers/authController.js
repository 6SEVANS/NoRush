const userModel = require('../models/userModel');
const CustomError = require('../utils/errorHandler');
const asyncHandler = require('../middleware/catchAsyncErrors');
const { string } = require('joi');
const jwt = require('jsonwebtoken');
/**
 * 
 */
const loginUser = asyncHandler(async (req, res, next) => {

//Login a user:
// 1.Find a user, e.g. match username and password
// with username and password in database.
// 2.Create JWT payload.
// 3. Sign token.
// 4. Send Success response.
});


/**
 * Registers a user using DisplayName, EmailAddress and Passkey.
 * Creates a new user and signs a new token.
 * @param {*} req DisplayName, EmailAddress, Passkey.
 * @param {*} res Result of user registration. 
 */
const registerUser = asyncHandler(async (req, res, next) => {
    //User Validation.
    if(!req.body.DisplayName || !req.body.EmailAddress || !req.body.Passkey){
        return next(new CustomError(400, 'Missing field.'));
    }
    let checkUser = await userModel.getUserByEmail(req.body.EmailAddress);
    if(checkUser){
        return next(new CustomError(400, 'Email already taken.'));
    }
    
    //Create new user and assign JWT.
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
// 1.Logging in a user.
// 2.Logging out a user.