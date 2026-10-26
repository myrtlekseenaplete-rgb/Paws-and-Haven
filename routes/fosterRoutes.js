const router = require('express').Router();
const c = require('../controllers/fosterController');

router.get('/applicants', c.listApplicants);
router.post('/applicants', c.createApplicant);
router.patch('/applicants/:id/approval', c.setApproval);
router.get('/assignments', c.listAssignments);
router.post('/assignments', c.assign);
router.patch('/assignments/:id/end', c.end);
module.exports = router;
