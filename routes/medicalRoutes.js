const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalController');

router.get('/', medicalController.renderMedicalLogs);
router.post('/', medicalController.createRecord); 
router.get('/create', medicalController.renderCreateForm);
router.post('/create', medicalController.createRecord);

module.exports = router;
