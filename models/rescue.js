const mongoose = require("mongoose");

const rescueRequestSchema = new mongoose.Schema({
  animalName: { type: String, default: "Unknown" },
  species: { type: String, required: true }, // 'Dog', 'Cat', etc.
  size: { type: String, enum: ["Small", "Medium", "Large"], required: true },
  specialNeeds: [{ type: String }], // e.g. ['Medical', 'No Other Pets', 'Puppy']
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  location: {
    address: { type: String, required: true },
    city: String,
    coordinates: { lat: Number, lng: Number },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Placed", "Rejected"],
    default: "Pending",
  },
  reportedBy: { type: String, required: true }, // User ID or Contact Info
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RescueRequest", rescueRequestSchema);
