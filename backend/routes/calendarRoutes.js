const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Get crop calendar for a specific crop
router.get('/:cropId', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId);
    
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const calendar = {
      cropName: crop.name,
      hindiName: crop.hindiName,
      season: crop.season,
      duration: crop.duration,
      timeline: generateMonthlyTimeline(crop),
      activities: {
        sowing: crop.sowingMonths,
        growth: crop.growthMonths,
        harvesting: crop.harvestingMonths
      }
    };

    res.json(calendar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate month-wise timeline
function generateMonthlyTimeline(crop) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months.map(month => {
    const isSowing = crop.sowingMonths?.some(m => 
      m.toLowerCase().includes(month.toLowerCase().substring(0, 3))
    );
    const isGrowth = crop.growthMonths?.some(m => 
      m.toLowerCase().includes(month.toLowerCase().substring(0, 3))
    );
    const isHarvesting = crop.harvestingMonths?.some(m => 
      m.toLowerCase().includes(month.toLowerCase().substring(0, 3))
    );

    let activity = [];
    if (isSowing) activity.push('Sowing');
    if (isGrowth) activity.push('Growth');
    if (isHarvesting) activity.push('Harvesting');

    return {
      month,
      activities: activity.length > 0 ? activity : ['Rest Period'],
      irrigation: isGrowth || isSowing ? crop.irrigationPercentage || 60 : 0,
      fertilizer: isSowing ? 'Apply base fertilizer' : isGrowth ? 'Apply top dressing' : null
    };
  });
}

module.exports = router;


