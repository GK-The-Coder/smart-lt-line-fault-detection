const mongoose = require("mongoose");

const poleSchema = new mongoose.Schema({
  poleId: String,
  voltage: Number,
  current: Number,
  status: String,
  faultType: String,
  theftDetected: Boolean,
  weatherRisk: String,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PoleData", poleSchema);
