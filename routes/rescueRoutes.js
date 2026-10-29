const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');

// Submit a rescue request
router.post('/request', rescueController.createRescueRequest);

// Dashboard view
router.get('/dashboard', rescueController.getRescueRequests);

// Smart Placement Endpoint
router.post('/match/:rescueId', rescueController.autoMatchAndPlace);

module.exports = router;