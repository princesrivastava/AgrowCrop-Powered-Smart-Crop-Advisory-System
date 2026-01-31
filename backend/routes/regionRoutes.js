const express = require('express');
const router = express.Router();
const Region = require('../models/Region');

// Get all regions/states
router.get('/', async (req, res) => {
  try {
    const regions = await Region.find().select('state districts climate');
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get region by state name
router.get('/:state', async (req, res) => {
  try {
    const region = await Region.findOne({ 
      state: new RegExp(req.params.state, 'i') 
    });
    if (!region) {
      return res.status(404).json({ error: 'Region not found' });
    }
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


