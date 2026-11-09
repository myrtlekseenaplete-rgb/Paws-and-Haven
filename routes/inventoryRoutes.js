const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.renderInventoryPage);

router.get('/api/inventory', inventoryController.getAllItems);
router.get('/api/inventory/:id', inventoryController.getItemById);
router.post('/api/inventory', inventoryController.createItem);
router.put('/api/inventory/:id', inventoryController.updateItem);
router.delete('/api/inventory/:id', inventoryController.deleteItem);

module.exports = router;