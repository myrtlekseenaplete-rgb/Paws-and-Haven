const { FosterProfile } = require('../models/fosterModel');

/**
 * Smart Placement Algorithm
 * Evaluates candidate foster parents for a specific rescue animal.
 */
async function findEligibleFosters(rescueRequest) {
  // Fetch approved and available foster parents
  const potentialFosters = await FosterProfile.find({
    isApproved: true,
    isAvailable: true
  });

  const scoredFosters = [];

  for (const foster of potentialFosters) {
    // 1. Check Capacity Hard Limit
    if (foster.currentActivePlacements >= foster.maxCapacity) {
      continue; // Skip foster if full
    }

    // 2. Check Size Compatibility
    if (!foster.allowedSizes.includes(rescueRequest.size)) {
      continue; // Skip if foster home cannot accommodate size
    }

    // 3. Score calculation based on special needs
    let score = 10; // Base eligibility score

    if (rescueRequest.specialNeeds.includes('Medical')) {
      if (foster.canHandleMedical) {
        score += 20;
      } else {
        continue; // Exclude if medical care needed but foster cannot provide it
      }
    }

    // Give priority based on urgency
    if (rescueRequest.urgency === 'Critical') score += 15;
    if (rescueRequest.urgency === 'High') score += 10;

    // Prefer fosters with fewer current placements
    score += (foster.maxCapacity - foster.currentActivePlacements) * 5;

    scoredFosters.push({ foster, score });
  }

  // Sort candidates by highest match score
  return scoredFosters.sort((a, b) => b.score - a.score);
}

module.exports = { findEligibleFosters };