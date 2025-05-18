const express = require('express');
const router = express.Router();
const kioskController = require('../controllers/kiosk.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/kiosks/search', authMiddleware, kioskController.searchNearby);

module.exports = router;
