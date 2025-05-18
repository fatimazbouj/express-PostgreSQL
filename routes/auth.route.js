const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// post /users/register
router.post('/users/register', authController.register);

// post  /users/login
router.post('/users/login', authController.login);

module.exports = router;
