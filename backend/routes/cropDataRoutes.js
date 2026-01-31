const express = require('express');
const router = express.Router();
const CropData = require('../models/CropData');

// Get crop statistics for a specific crop
router.get('/stats/:cropName', async (req, res) => {
  try {
    const cropName = req.params.cropName.toLowerCase();
    const stats = await CropData.aggregate([
      { $match: { label: cropName } },
      {
        $group: {
          _id: '$label',
          count: { $sum: 1 },
          avgN: { $avg: '$N' },
          avgP: { $avg: '$P' },
          avgK: { $avg: '$K' },
          avgTemperature: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          avgPh: { $avg: '$ph' },
          avgRainfall: { $avg: '$rainfall' },
          minTemperature: { $min: '$temperature' },
          maxTemperature: { $max: '$temperature' },
          minRainfall: { $min: '$rainfall' },
          maxRainfall: { $max: '$rainfall' },
          minPh: { $min: '$ph' },
          maxPh: { $max: '$ph' }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.status(404).json({ error: 'Crop not found in dataset' });
    }

    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all unique crops from dataset
router.get('/crops', async (req, res) => {
  try {
    const crops = await CropData.distinct('label');
    res.json(crops.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find crops matching environmental conditions
router.post('/recommend', async (req, res) => {
  try {
    const { temperature, humidity, ph, rainfall, N, P, K } = req.body;

    if (!temperature || !humidity || !ph || !rainfall) {
      return res.status(400).json({ 
        error: 'Temperature, humidity, pH, and rainfall are required' 
      });
    }

    // Find crops within tolerance ranges
    const tolerance = {
      temperature: 5, // ±5°C
      humidity: 10,   // ±10%
      ph: 1.0,        // ±1.0
      rainfall: 50    // ±50mm
    };

    const matches = await CropData.find({
      temperature: {
        $gte: temperature - tolerance.temperature,
        $lte: temperature + tolerance.temperature
      },
      humidity: {
        $gte: humidity - tolerance.humidity,
        $lte: humidity + tolerance.humidity
      },
      ph: {
        $gte: ph - tolerance.ph,
        $lte: ph + tolerance.ph
      },
      rainfall: {
        $gte: rainfall - tolerance.rainfall,
        $lte: rainfall + tolerance.rainfall
      }
    }).limit(100);

    // Group by crop and count matches
    const cropMatches = {};
    matches.forEach(match => {
      if (!cropMatches[match.label]) {
        cropMatches[match.label] = {
          crop: match.label,
          count: 0,
          avgN: 0,
          avgP: 0,
          avgK: 0,
          samples: []
        };
      }
      cropMatches[match.label].count++;
      cropMatches[match.label].samples.push({
        N: match.N,
        P: match.P,
        K: match.K,
        temperature: match.temperature,
        humidity: match.humidity,
        ph: match.ph,
        rainfall: match.rainfall
      });
    });

    // Calculate averages
    Object.keys(cropMatches).forEach(crop => {
      const samples = cropMatches[crop].samples;
      cropMatches[crop].avgN = samples.reduce((sum, s) => sum + s.N, 0) / samples.length;
      cropMatches[crop].avgP = samples.reduce((sum, s) => sum + s.P, 0) / samples.length;
      cropMatches[crop].avgK = samples.reduce((sum, s) => sum + s.K, 0) / samples.length;
      delete cropMatches[crop].samples;
    });

    // Sort by match count (most matches first)
    const recommendations = Object.values(cropMatches)
      .sort((a, b) => b.count - a.count)
      .map(crop => ({
        ...crop,
        matchScore: Math.min(100, (crop.count / 10) * 100) // Score out of 100
      }));

    res.json({
      input: { temperature, humidity, ph, rainfall, N, P, K },
      recommendations,
      totalMatches: matches.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


