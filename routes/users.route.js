const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { getUserInfo } = require('../controllers/user.controller');

router.get('/users/:id', authMiddleware, getUserInfo);

module.exports = router;
