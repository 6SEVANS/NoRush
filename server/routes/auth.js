/**
 * auth.js contains the routes in relation
 * to JWT authentication.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Routes in relation to Auth.
router.post('/', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;