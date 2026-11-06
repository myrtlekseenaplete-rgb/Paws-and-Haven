const express = require('express');
const router = express.Router();
const Medical = require('../controllers/medicalController');

router.get('/', Medical.renderMedicalLogs);

module.exports = router;