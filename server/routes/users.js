/**
 * users.js contains the routes in relation
 * to the users table of the database.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//CRUD implementation in relation to Users.
router.get('/', userController.getAllUsers);
router.get('/:UserID', userController.getUserByID);
router.post('/', userController.createUser);
router.put('/update/:UserID', userController.updateUserByID);
router.delete('/delete/:UserID', userController.deleteUserByID);

module.exports = router;