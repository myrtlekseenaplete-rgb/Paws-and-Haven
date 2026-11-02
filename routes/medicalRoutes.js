const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalController');

// Route to display all medical logs
router.get('/', medicalController.renderMedicalLogs);

// Route to handle submitting a new medical record
router.post('/create', medicalController.createRecord);

// Route to display the special SQL join reports (Right Join & Full Outer Join)
router.get('/reports', medicalController.renderJoinReports);

module.exports = router;