// Mock Recommendations Service
// Provides sample crop recommendations when backend is unavailable

export const mockCropDatabase = {
    "Madhya Pradesh": {
        Kharif: [
            { name: "Rice", hindiName: "धान", score: 92, irrigationPercentage: 85, fertilizerGuidance: "NPK 120:60:40 kg/ha", reasons: ["High rainfall suitable for paddy", "Alluvial soil ideal", "Good market prices"] },
            { name: "Soybean", hindiName: "सोयाबीन", score: 88, irrigationPercentage: 65, fertilizerGuidance: "NPK 30:60:40 + Rhizobium", reasons: ["Best for monsoon season", "Low water requirement", "High protein oilseed"] },
            { name: "Cotton", hindiName: "कपास", score: 82, irrigationPercentage: 75, fertilizerGuidance: "NPK 100:50:50 kg/ha", reasons: ["Good for black soil", "Long growing season", "Profitable cash crop"] }
        ],
        Rabi: [
            { name: "Wheat", hindiName: "गेहूं", score: 95, irrigationPercentage: 70, fertilizerGuidance: "NPK 120:60:40 kg/ha", reasons: ["Perfect winter temperature", "High yielding varieties available", "Excellent market demand"] },
            { name: "Chickpea", hindiName: "चना", score: 87, irrigationPercentage: 45, fertilizerGuidance: "NPK 20:40:20 + PSB", reasons: ["Low irrigation need", "Nitrogen fixer", "Good MSP support"] },
            { name: "Mustard", hindiName: "सरसों", score: 83, irrigationPercentage: 50, fertilizerGuidance: "NPK 60:40:20 kg/ha", reasons: ["Short duration crop", "Good oil content", "Easy cultivation"] }
        ],
        Zaid: [
            { name: "Watermelon", hindiName: "तरबूज", score: 85, irrigationPercentage: 80, fertilizerGuidance: "NPK 60:30:30 kg/ha", reasons: ["High summer demand", "Quick returns", "Good profit margins"] },
            { name: "Cucumber", hindiName: "खीरा", score: 79, irrigationPercentage: 75, fertilizerGuidance: "NPK 50:25:25 kg/ha", reasons: ["Fast growing", "Multiple harvests", "Low input cost"] }
        ]
    },
    "Punjab": {
        Kharif: [
            { name: "Rice", hindiName: "धान", score: 96, irrigationPercentage: 90, fertilizerGuidance: "NPK 150:75:50 kg/ha", reasons: ["Abundant irrigation", "High yielding Basmati varieties", "Government procurement"] }
        ],
        Rabi: [
            { name: "Wheat", hindiName: "गेहूं", score: 98, irrigationPercentage: 75, fertilizerGuidance: "NPK 150:75:50 kg/ha", reasons: ["Ideal wheat belt", "High productivity", "Assured MSP"] }
        ]
    },
    "Maharashtra": {
        Kharif: [
            { name: "Cotton", hindiName: "कपास", score: 94, irrigationPercentage: 70, fertilizerGuidance: "NPK 120:60:60 kg/ha", reasons: ["Black cotton soil", "Leading cotton state", "Good ginning facilities"] },
            { name: "Soybean", hindiName: "सोयाबीन", score: 86, irrigationPercentage: 60, fertilizerGuidance: "NPK 30:60:40 kg/ha", reasons: ["Suitable climate", "Processing units nearby", "Good market access"] }
        ],
        Rabi: [
            { name: "Chickpea", hindiName: "चना", score: 88, irrigationPercentage: 40, fertilizerGuidance: "NPK 20:40:20 kg/ha", reasons: ["Residual moisture", "Less irrigation", "Good demand"] }
        ]
    }
};

export const mockRegionData = {
    "Madhya Pradesh": {
        state: "Madhya Pradesh",
        climate: "Subtropical",
        averageRainfall: 1200,
        averageTemperature: 26,
        soilType: { primary: "Black soil" },
        waterAvailability: "Moderate"
    },
    "Punjab": {
        state: "Punjab",
        climate: "Semi-arid",
        averageRainfall: 600,
        averageTemperature: 24,
        soilType: { primary: "Alluvial soil" },
        waterAvailability: "High (Canal irrigation)"
    },
    "Maharashtra": {
        state: "Maharashtra",
        climate: "Tropical",
        averageRainfall: 900,
        averageTemperature: 27,
        soilType: { primary: "Black cotton soil" },
        waterAvailability: "Moderate"
    }
};

export class MockRecommendationsService {
    static async getRecommendations(season, state) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get state data or use default
        const stateData = mockCropDatabase[state];
        const regionData = mockRegionData[state] || {
            state,
            climate: "Varied",
            averageRainfall: 1000,
            averageTemperature: 25,
            soilType: { primary: "Mixed soil" },
            waterAvailability: "Moderate"
        };

        // Get crops for the season
        let crops = [];
        if (stateData && stateData[season]) {
            crops = stateData[season];
        } else {
            // Fallback generic crops
            crops = [
                { name: "Rice", hindiName: "धान", score: 75, irrigationPercentage: 80, fertilizerGuidance: "NPK 100:50:40 kg/ha", reasons: ["Suitable for most regions", "Stable market", "Food security crop"] },
                { name: "Wheat", hindiName: "गेहूं", score: 73, irrigationPercentage: 65, fertilizerGuidance: "NPK 100:50:40 kg/ha", reasons: ["Staple food crop", "Wide adaptability", "Good returns"] }
            ];
        }

        return {
            state,
            season,
            regionData,
            recommendations: crops.map(crop => ({
                crop: { name: crop.name, hindiName: crop.hindiName },
                score: crop.score,
                irrigationPercentage: crop.irrigationPercentage,
                fertilizerGuidance: crop.fertilizerGuidance,
                reasons: crop.reasons
            }))
        };
    }
}
