const express = require('express');
const router = express.Router();
const { FosterProfile } = require('../models/fosterModel');

// Foster registration
router.post('/apply', async (req, res) => {
  try {
    const profile = new FosterProfile(req.body);
    await profile.save();
    res.redirect('/foster/dashboard');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// View foster dashboard
router.get('/dashboard', async (req, res) => {
  const fosters = await FosterProfile.find();
  res.render('fosterDashboard', { fosters });
});

module.exports = router;