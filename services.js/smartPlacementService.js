const { FosterProfile } = require('../models/fosterModel');

async function findEligibleFosters(req) {
  const fosters = await FosterProfile.find({ isApproved: true, isAvailable: true });

  return fosters
    .filter(f => 
      f.currentActivePlacements < f.maxCapacity &&
      f.allowedSizes.includes(req.size) &&
      (!req.specialNeeds.includes('Medical') || f.canHandleMedical)
    )
    .map(f => {
      let score = 10;
      if (req.specialNeeds.includes('Medical')) score += 20;
      if (req.urgency === 'Critical') score += 15;
      if (req.urgency === 'High') score += 10;
      score += (f.maxCapacity - f.currentActivePlacements) * 5;
      return { foster: f, score };
    })
    .sort((a, b) => b.score - a.score);
}

module.exports = { findEligibleFosters };