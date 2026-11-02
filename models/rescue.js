const { Rescue, Foster } = require('../models/rescueFosterModel');

// UNIQUE FEATURE: Smart Match & Place Algorithm
exports.smartMatchFoster = async (req, res) => {
  try {
    const animal = await Rescue.findById(req.params.id);
    
    // 1. Find available fosters matching the animal's size and capacity
    const availableFosters = await Foster.find({ 
      isAvailable: true,
      allowedSizes: animal.size 
    });

    if (availableFosters.length === 0) {
      return res.json({ message: "No matching foster found." });
    }

    // 2. Pick the best foster (highest remaining capacity)
    const bestFoster = availableFosters.sort((a, b) => 
      (b.maxCapacity - b.currentPlacements) - (a.maxCapacity - a.currentPlacements)
    )[0];

    // 3. Update records
    bestFoster.currentPlacements += 1;
    if (bestFoster.currentPlacements >= bestFoster.maxCapacity) {
      bestFoster.isAvailable = false;
    }
    await bestFoster.save();

    animal.status = 'Placed';
    await animal.save();

    res.json({ success: true, matchedTo: bestFoster.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};