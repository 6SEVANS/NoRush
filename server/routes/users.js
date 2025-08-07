/**
 * users.js contains the routes in relation
 * to the users table of the database.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD implementation.
router.get('/', userController.getAllUsers);
router.get('/:UserID', userController.getUserByID);

module.exports = router;