<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { FosterProfile } = require('../models/fosterModel');


router.post('/apply', async (req, res) => {
  try {
    const profile = new FosterProfile(req.body);
    await profile.save();
    res.redirect('/foster/dashboard');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/dashboard', async (req, res) => {
  const fosters = await FosterProfile.find();
  res.render('fosterDashboard', { fosters });
});

module.exports = router;
=======
const router = require('express').Router();
const c = require('../controllers/fosterController');

router.get('/applicants', c.listApplicants);
router.post('/applicants', c.createApplicant);
router.patch('/applicants/:id/approval', c.setApproval);
router.get('/assignments', c.listAssignments);
router.post('/assignments', c.assign);
router.patch('/assignments/:id/end', c.end);
module.exports = router;
>>>>>>> 3b441162e5babb51776aff71a550f566ccc07d96
