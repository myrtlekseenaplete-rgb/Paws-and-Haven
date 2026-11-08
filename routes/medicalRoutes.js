const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalController');

router.get('/', medicalController.renderMedicalLogs);
router.get('/create', medicalController.renderCreateForm);
router.post('/create', medicalController.createRecord);
router.get('/reports', medicalController.renderJoinReports);

module.exports = router;
