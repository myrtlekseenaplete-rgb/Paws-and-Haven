const express = require('express');
const router = express.Router();
const systemLogController = require('../controllers/systemLogController');

router.get('/user-audit-logs', systemLogController.getUserAuditLogs);

module.exports = router;