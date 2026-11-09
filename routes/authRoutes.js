
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/profile', authController.profile);
router.post('/logout', authController.logout);

module.exports = router;
