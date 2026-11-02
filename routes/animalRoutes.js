const router = require('express').Router();
const c = require('../controllers/animalController');

router.get('/report/foster-dashboard', c.fosterReport); // Join Report 2 (keep above /:id)
router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
module.exports = router;
