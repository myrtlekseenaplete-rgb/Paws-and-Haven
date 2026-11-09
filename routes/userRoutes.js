const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/:id/update', userController.updateUser);
router.post('/:id/delete', userController.deleteUser);

module.exports = router;