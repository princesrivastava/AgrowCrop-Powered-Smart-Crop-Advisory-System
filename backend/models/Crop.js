const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hindiName: String,
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'All'],
    required: true
  },
  suitableStates: [String],
  minTemperature: Number,
  maxTemperature: Number,
  minRainfall: Number,
  maxRainfall: Number,
  soilTypes: [String],
  soilPhMin: Number,
  soilPhMax: Number,
  waterRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  irrigationPercentage: Number,
  fertilizerTypes: [String],
  fertilizerGuidance: String,
  sowingMonths: [String],
  growthMonths: [String],
  harvestingMonths: [String],
  duration: Number, // in days
  yield: String,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);


