
const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterDataController');

router.get('/', masterDataController.getMasterData);

module.exports = router;
