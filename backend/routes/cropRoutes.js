const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Get all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get crop by ID
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get crops by season
router.get('/season/:season', async (req, res) => {
  try {
    const crops = await Crop.find({ 
      $or: [
        { season: req.params.season },
        { season: 'All' }
      ]
    });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


