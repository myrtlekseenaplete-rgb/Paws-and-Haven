const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');
router.post('/request', rescueController.createRescueRequest);
router.get('/dashboard', rescueController.getRescueRequests);

router.post('/match/:rescueId', rescueController.autoMatchAndPlace);

module.exports = router;