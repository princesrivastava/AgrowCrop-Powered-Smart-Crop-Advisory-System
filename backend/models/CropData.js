const mongoose = require('mongoose');

const cropDataSchema = new mongoose.Schema({
  N: {
    type: Number,
    required: true
  },
  P: {
    type: Number,
    required: true
  },
  K: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  ph: {
    type: Number,
    required: true
  },
  rainfall: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true,
    lowercase: true
  }
}, {
  timestamps: true
});

// Index for faster queries
cropDataSchema.index({ label: 1 });
cropDataSchema.index({ temperature: 1, humidity: 1, ph: 1, rainfall: 1 });

module.exports = mongoose.model('CropData', cropDataSchema);


