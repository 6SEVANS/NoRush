/**
 * errorHandler.js Allows for custom and centralised error handling.
 */
class CustomError extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    };
};
module.exports = CustomError;