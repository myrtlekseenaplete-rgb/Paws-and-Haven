const mongoose = require('mongoose');

const fosterProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  maxCapacity: { type: Number, default: 2 },
  currentActivePlacements: { type: Number, default: 0 },
  allowedSizes: [{ type: String, enum: ['Small', 'Medium', 'Large'] }],
  hasOtherPets: { type: Boolean, default: false },
  canHandleMedical: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }
});

const placementSchema = new mongoose.Schema({
  rescueRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'RescueRequest', required: true },
  fosterProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'FosterProfile', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  status: { type: String, enum: ['Active', 'Completed', 'Terminated'], default: 'Active' },
  notes: String
});

module.exports = {
  FosterProfile: mongoose.model('FosterProfile', fosterProfileSchema),
  Placement: mongoose.model('Placement', placementSchema)
};