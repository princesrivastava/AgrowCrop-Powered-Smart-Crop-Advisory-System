const express = require('express');
const router = express.Router();

// Helper function to generate random price within a range
const getRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate trend data
const generateTrendData = (basePrice) => {
    const trend = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Random fluctuation within ±5%
        const fluctuation = basePrice * 0.05;
        const price = Math.floor(basePrice + (Math.random() * fluctuation * 2) - fluctuation);

        trend.push({
            date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            pricePerQuintal: price
        });
    }
    return trend;
};

// Optimized price recommendation endpoint
router.post('/optimize', (req, res) => {
    try {
        const { crop, state, district } = req.body;

        if (!crop || !state) {
            return res.status(400).json({ error: 'Crop and state are required' });
        }

        // Mock Mandi Data Generation
        const districtsList = [
            district || 'District A',
            'District B',
            'District C',
            'District D',
            'District E'
        ];

        const mandis = districtsList.map((d, index) => {
            // Base price variation based on crop
            let basePrice = 2000;
            if (crop.toLowerCase().includes('wheat')) basePrice = 2200;
            if (crop.toLowerCase().includes('rice')) basePrice = 3000;
            if (crop.toLowerCase().includes('cotton')) basePrice = 6000;
            if (crop.toLowerCase().includes('soybean')) basePrice = 4000;

            // Add random variation for each mandi
            const price = getRandomPrice(basePrice - 200, basePrice + 300);

            // Calculate scores
            const priceScore = (price / (basePrice + 300)) * 60; // Max 60 points
            const proximityScore = index === 0 ? 30 : Math.max(0, 30 - (index * 5)); // Max 30 points
            const trendScore = getRandomPrice(5, 10); // Max 10 points

            const totalScore = priceScore + proximityScore + trendScore;

            return {
                mandiName: `${d} Market Yard`,
                district: d,
                price: price,
                distance: index * 15 + 5, // km
                score: totalScore,
                priceScore,
                proximityScore,
                trendScore
            };
        });

        // Sort by score descending
        mandis.sort((a, b) => b.score - a.score);

        res.json({
            recommended: mandis[0],
            allOptions: mandis,
            analysis: {
                totalMandis: mandis.length,
                priceRange: {
                    min: Math.min(...mandis.map(m => m.price)),
                    max: Math.max(...mandis.map(m => m.price))
                },
                bestMandi: mandis[0].mandiName
            }
        });

    } catch (error) {
        console.error('Market price error:', error);
        res.status(500).json({ error: 'Failed to optimize market prices' });
    }
});

// Price trend endpoint
router.get('/trend', (req, res) => {
    try {
        const { crop, mandi } = req.query;

        // Base price based on crop
        let basePrice = 2000;
        if (crop && crop.toLowerCase().includes('wheat')) basePrice = 2200;
        if (crop && crop.toLowerCase().includes('rice')) basePrice = 3000;
        if (crop && crop.toLowerCase().includes('cotton')) basePrice = 6000;
        if (crop && crop.toLowerCase().includes('soybean')) basePrice = 4000;

        const trendData = generateTrendData(basePrice);
        res.json(trendData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trend data' });
    }
});

module.exports = router;
