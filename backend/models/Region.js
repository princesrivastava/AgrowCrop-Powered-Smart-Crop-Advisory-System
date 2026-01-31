const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true
  },
  districts: [String],
  climate: {
    type: String,
    enum: ['Tropical', 'Subtropical', 'Temperate', 'Arid', 'Semi-Arid', 'Tropical Monsoon']
  },
  averageRainfall: Number, // in mm
  averageTemperature: Number, // in Celsius
  soilType: {
    primary: String,
    secondary: [String]
  },
  soilPh: {
    min: Number,
    max: Number,
    average: Number
  },
  waterAvailability: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High']
  },
  majorCrops: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Region', regionSchema);


