const mongoose = require('mongoose');

const rescueSchema = new mongoose.Schema({
  species: { type: String, required: true }, // e.g., Dog, Cat
  size: { type: String, enum: ['Small', 'Medium', 'Large'] },
  urgency: { type: String, default: 'Medium' },
  status: { type: String, default: 'Pending' }, // Pending, Placed, etc.
  address: String,
  reportedBy: String
});

module.exports = mongoose.model('RescueRequest', rescueSchema);