# Crop Recommendation CSV Integration

## Overview

The `Crop_recommendation.csv` file contains machine learning training data with 2,200 samples across 22 different crops. This data is now integrated into the AgrowCrop platform to enhance crop recommendations.

## Dataset Information

- **Total Records**: 2,200 rows
- **Unique Crops**: 22 crops (100 samples each)
- **Features**:
  - N, P, K (soil nutrients)
  - Temperature (°C)
  - Humidity (%)
  - pH (soil acidity/alkalinity)
  - Rainfall (mm)
  - Label (crop name)

### Crops in Dataset

1. rice
2. maize
3. jute
4. cotton
5. coconut
6. papaya
7. orange
8. apple
9. muskmelon
10. watermelon
11. grapes
12. mango
13. banana
14. pomegranate
15. lentil
16. blackgram
17. mungbean
18. mothbeans
19. pigeonpeas
20. kidneybeans
21. chickpea
22. coffee

## Importing Data

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Import CSV Data to MongoDB
```bash
node backend/scripts/importCropData.js
```

This script will:
- Connect to MongoDB
- Clear existing crop data
- Read the CSV file
- Import all 2,200 records
- Display statistics for each crop

### Step 3: Verify Import
Check the console output for import statistics showing:
- Total records imported
- Unique crops
- Average temperature, rainfall, pH, and humidity for each crop

## API Endpoints

### 1. Get Crop Statistics
```
GET /api/crop-data/stats/:cropName
```
Example: `/api/crop-data/stats/rice`

Returns average and range values for:
- Temperature
- Rainfall
- pH
- Humidity
- N, P, K nutrients

### 2. Get All Crops
```
GET /api/crop-data/crops
```
Returns list of all unique crop names in the dataset.

### 3. Get Recommendations Based on Conditions
```
POST /api/crop-data/recommend
Body: {
  "temperature": 25,
  "humidity": 80,
  "ph": 6.5,
  "rainfall": 200,
  "N": 90,
  "P": 42,
  "K": 43
}
```

Returns crops that match the environmental conditions within tolerance ranges:
- Temperature: ±5°C
- Humidity: ±10%
- pH: ±1.0
- Rainfall: ±50mm

## Integration with Existing System

The CSV data complements the existing crop database by:

1. **Providing ML Training Data**: Can be used to train machine learning models
2. **Environmental Matching**: Helps match crops to specific environmental conditions
3. **Data Validation**: Provides reference ranges for crop requirements
4. **Enhanced Recommendations**: Improves accuracy of crop recommendations

## Usage in Java Backend

The Java Spring Boot service can now:
- Query crop statistics from MongoDB
- Use environmental data for more accurate recommendations
- Match user's region data with crop requirements from the dataset

## File Location

The CSV file should be located at:
- `AgrowCrop/Crop_recommendation.csv` (preferred)
- Or `c:/Users/asus/Desktop/Project/Crop_recommendation.csv` (fallback)

The import script will automatically check both locations.

## Next Steps

1. **Train ML Model**: Use this data to train a prediction model
2. **Enhance Recommendations**: Integrate with Java recommendation engine
3. **Add More Crops**: Extend the dataset with additional crops
4. **Real-time Predictions**: Use the model for real-time crop recommendations


