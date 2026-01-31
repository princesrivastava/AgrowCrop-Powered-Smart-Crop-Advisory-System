const express = require('express');
const router = express.Router();
const axios = require('axios');
const Crop = require('../models/Crop');
const Region = require('../models/Region');

// Get crop recommendations based on season and region
router.post('/', async (req, res) => {
  try {
    const { season, state } = req.body;

    if (!season || !state) {
      return res.status(400).json({ 
        error: 'Season and state are required' 
      });
    }

    // Get region data
    const region = await Region.findOne({ 
      state: new RegExp(state, 'i') 
    });

    if (!region) {
      return res.status(404).json({ 
        error: 'Region data not found. Please check the state name.' 
      });
    }

    // Get crops for the season
    const seasonCrops = await Crop.find({
      $or: [
        { season: season },
        { season: 'All' }
      ]
    });

    // Call Java service for intelligent recommendations
    let recommendations = [];
    try {
      const javaServiceUrl = process.env.JAVA_SERVICE_URL || 'http://localhost:8080';
      const response = await axios.post(`${javaServiceUrl}/api/recommendations/analyze`, {
        season,
        region: region.toObject(),
        crops: seasonCrops.map(c => c.toObject())
      });
      recommendations = response.data.recommendations;
    } catch (javaError) {
      console.error('Java service error, using fallback logic:', javaError.message);
      // Fallback: Basic filtering based on region compatibility
      recommendations = seasonCrops
        .filter(crop => {
          return !crop.suitableStates.length || 
                 crop.suitableStates.some(s => 
                   s.toLowerCase().includes(state.toLowerCase())
                 );
        })
        .map(crop => ({
          crop: crop.toObject(),
          score: 75,
          irrigationPercentage: crop.irrigationPercentage || 60,
          fertilizerGuidance: crop.fertilizerGuidance || 'Apply balanced NPK fertilizer as per soil test',
          reasons: [`Suitable for ${season} season`, `Compatible with ${region.climate} climate`]
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }

    res.json({
      season,
      state: region.state,
      regionData: {
        climate: region.climate,
        averageRainfall: region.averageRainfall,
        averageTemperature: region.averageTemperature,
        soilType: region.soilType,
        soilPh: region.soilPh,
        waterAvailability: region.waterAvailability
      },
      recommendations
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


