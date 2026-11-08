const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/animals', reportController.getAnimalReport);

module.exports = router;