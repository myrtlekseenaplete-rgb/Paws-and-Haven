const RescueRequest = require('../models/rescueModel');
const { FosterProfile, Placement } = require('../models/fosterModel');
const { findEligibleFosters } = require('../services/smartPlacementService');

// Submit new rescue request
exports.createRescueRequest = async (req, res) => {
  try {
    const newRescue = new RescueRequest(req.body);
    await newRescue.save();
    res.status(201).json({ message: 'Rescue request submitted successfully', data: newRescue });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all rescue requests
exports.getRescueRequests = async (req, res) => {
  try {
    const requests = await RescueRequest.find();
    res.render('rescueDashboard', { requests });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
};

// UNIQUE FEATURE: Match & Auto-Assign Foster
exports.autoMatchAndPlace = async (req, res) => {
  try {
    const { rescueId } = req.params;
    const rescue = await RescueRequest.findById(rescueId);

    if (!rescue) return res.status(404).json({ error: 'Rescue request not found' });

    // Run Smart Placement Engine
    const matches = await findEligibleFosters(rescue);

    if (matches.length === 0) {
      return res.status(400).json({ message: 'No eligible foster parents available at this time.' });
    }

    // Select top candidate
    const bestMatch = matches[0].foster;

    // Create Placement Record
    const newPlacement = new Placement({
      rescueRequestId: rescue._id,
      fosterProfileId: bestMatch._id
    });
    await newPlacement.save();

    // Update Rescue & Foster statuses
    rescue.status = 'Placed';
    await rescue.save();

    bestMatch.currentActivePlacements += 1;
    if (bestMatch.currentActivePlacements >= bestMatch.maxCapacity) {
      bestMatch.isAvailable = false;
    }
    await bestMatch.save();

    res.status(200).json({
      message: 'Smart placement successful!',
      matchedFoster: bestMatch.fullName,
      placement: newPlacement
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};