const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const CropData = require('../models/CropData');
require('dotenv').config();

async function importCropData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agrowcrop');
    console.log('Connected to MongoDB');

    // Clear existing data
    await CropData.deleteMany({});
    console.log('Cleared existing crop data');

    // Read CSV file
    const csvPath = path.join(__dirname, '../../AgrowCrop/Crop_recommendation.csv');
    const altPath = path.join(__dirname, '../../c:/Users/asus/Desktop/Project/Crop_recommendation.csv');
    
    let filePath = csvPath;
    if (!fs.existsSync(filePath)) {
      filePath = altPath;
    }
    
    if (!fs.existsSync(filePath)) {
      console.error('CSV file not found. Please ensure Crop_recommendation.csv exists in AgrowCrop folder or Desktop/Project folder');
      process.exit(1);
    }

    console.log(`Reading CSV file from: ${filePath}`);

    const results = [];
    let rowCount = 0;

    // Read and parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            N: parseFloat(data.N),
            P: parseFloat(data.P),
            K: parseFloat(data.K),
            temperature: parseFloat(data.temperature),
            humidity: parseFloat(data.humidity),
            ph: parseFloat(data.ph),
            rainfall: parseFloat(data.rainfall),
            label: data.label.toLowerCase().trim()
          });
          rowCount++;
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Parsed ${rowCount} rows from CSV`);

    // Insert in batches
    const batchSize = 100;
    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize);
      await CropData.insertMany(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(results.length / batchSize)}`);
    }

    // Get statistics
    const stats = await CropData.aggregate([
      {
        $group: {
          _id: '$label',
          count: { $sum: 1 },
          avgTemp: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          avgPh: { $avg: '$ph' },
          avgRainfall: { $avg: '$rainfall' },
          minTemp: { $min: '$temperature' },
          maxTemp: { $max: '$temperature' },
          minRainfall: { $min: '$rainfall' },
          maxRainfall: { $max: '$rainfall' },
          minPh: { $min: '$ph' },
          maxPh: { $max: '$ph' }
        }
      }
    ]);

    console.log('\n=== Import Statistics ===');
    console.log(`Total records imported: ${results.length}`);
    console.log(`Unique crops: ${stats.length}\n`);
    
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} records`);
      console.log(`  Temperature: ${stat.minTemp.toFixed(1)}°C - ${stat.maxTemp.toFixed(1)}°C (avg: ${stat.avgTemp.toFixed(1)}°C)`);
      console.log(`  Rainfall: ${stat.minRainfall.toFixed(1)}mm - ${stat.maxRainfall.toFixed(1)}mm (avg: ${stat.avgRainfall.toFixed(1)}mm)`);
      console.log(`  pH: ${stat.minPh.toFixed(2)} - ${stat.maxPh.toFixed(2)} (avg: ${stat.avgPh.toFixed(2)})`);
      console.log(`  Humidity: ${stat.avgHumidity.toFixed(1)}% (avg)\n`);
    });

    console.log('✅ Crop data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing crop data:', error);
    process.exit(1);
  }
}

importCropData();


