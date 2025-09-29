/**
 * Middleware for Authentication.
 * 
 */

const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

};


module.exports = {verifyToken};



// authMiddleware.js will contain the code for:
// 1. Verifying a JWT.


// To-Do:
// Encrypt password.
// Complete routes for signing up and logging in.
// Complete route for logging out.