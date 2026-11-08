const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');
const Medical = require('../controllers/medicalController');

router.get('/animals', reportController.getAnimalReport);
router.get('/', Medical.renderMedicalLogs);

module.exports = router;