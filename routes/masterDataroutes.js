const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterDataController');

router.get('/master-data', masterDataController.getSpeciesAndBreeds);

module.exports = router;
