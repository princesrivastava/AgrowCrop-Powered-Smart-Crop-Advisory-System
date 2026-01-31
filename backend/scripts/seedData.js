const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const Region = require('../models/Region');
require('dotenv').config();

// Sample Indian states data
const regionsData = [
  {
    state: 'Punjab',
    districts: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'],
    climate: 'Subtropical',
    averageRainfall: 600,
    averageTemperature: 25,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Loamy']
    },
    soilPh: {
      min: 6.5,
      max: 7.5,
      average: 7.0
    },
    waterAvailability: 'High',
    majorCrops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane']
  },
  {
    state: 'Maharashtra',
    districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    climate: 'Tropical',
    averageRainfall: 1200,
    averageTemperature: 28,
    soilType: {
      primary: 'Black',
      secondary: ['Red', 'Laterite']
    },
    soilPh: {
      min: 6.0,
      max: 7.5,
      average: 6.8
    },
    waterAvailability: 'Medium',
    majorCrops: ['Cotton', 'Sugarcane', 'Soybean', 'Wheat']
  },
  {
    state: 'Karnataka',
    districts: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    climate: 'Tropical',
    averageRainfall: 1100,
    averageTemperature: 27,
    soilType: {
      primary: 'Red',
      secondary: ['Black', 'Laterite']
    },
    soilPh: {
      min: 5.5,
      max: 7.0,
      average: 6.2
    },
    waterAvailability: 'Medium',
    majorCrops: ['Rice', 'Ragi', 'Jowar', 'Cotton', 'Sugarcane']
  },
  {
    state: 'Tamil Nadu',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    climate: 'Tropical',
    averageRainfall: 950,
    averageTemperature: 29,
    soilType: {
      primary: 'Red',
      secondary: ['Alluvial', 'Black']
    },
    soilPh: {
      min: 6.0,
      max: 7.5,
      average: 6.5
    },
    waterAvailability: 'Medium',
    majorCrops: ['Rice', 'Cotton', 'Sugarcane', 'Groundnut']
  },
  {
    state: 'Uttar Pradesh',
    districts: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad'],
    climate: 'Subtropical',
    averageRainfall: 1000,
    averageTemperature: 26,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Black']
    },
    soilPh: {
      min: 6.5,
      max: 7.5,
      average: 7.0
    },
    waterAvailability: 'High',
    majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Potato']
  },
  {
    state: 'Gujarat',
    districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    climate: 'Arid',
    averageRainfall: 800,
    averageTemperature: 30,
    soilType: {
      primary: 'Black',
      secondary: ['Alluvial']
    },
    soilPh: {
      min: 7.0,
      max: 8.5,
      average: 7.5
    },
    waterAvailability: 'Low',
    majorCrops: ['Cotton', 'Groundnut', 'Wheat', 'Sugarcane']
  },
  {
    state: 'Rajasthan',
    districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
    climate: 'Arid',
    averageRainfall: 500,
    averageTemperature: 32,
    soilType: {
      primary: 'Desert',
      secondary: ['Alluvial', 'Red']
    },
    soilPh: {
      min: 7.5,
      max: 8.5,
      average: 8.0
    },
    waterAvailability: 'Low',
    majorCrops: ['Wheat', 'Barley', 'Mustard', 'Cotton']
  },
  {
    state: 'West Bengal',
    districts: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
    climate: 'Tropical',
    averageRainfall: 1500,
    averageTemperature: 27,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Red', 'Laterite']
    },
    soilPh: {
      min: 5.5,
      max: 7.0,
      average: 6.3
    },
    waterAvailability: 'High',
    majorCrops: ['Rice', 'Jute', 'Tea', 'Potato']
  },
  {
    state: 'Madhya Pradesh',
    districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
    climate: 'Subtropical',
    averageRainfall: 1100,
    averageTemperature: 26,
    soilType: {
      primary: 'Black',
      secondary: ['Alluvial', 'Red']
    },
    soilPh: {
      min: 6.0,
      max: 7.5,
      average: 6.8
    },
    waterAvailability: 'Medium',
    majorCrops: ['Soybean', 'Wheat', 'Gram', 'Rice']
  },
  {
    state: 'Haryana',
    districts: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
    climate: 'Subtropical',
    averageRainfall: 600,
    averageTemperature: 25,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Sandy']
    },
    soilPh: {
      min: 6.5,
      max: 7.8,
      average: 7.2
    },
    waterAvailability: 'High',
    majorCrops: ['Wheat', 'Barley', 'Rice', 'Mustard']
  },
  {
    state: 'Bihar',
    districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    climate: 'Subtropical',
    averageRainfall: 1200,
    averageTemperature: 26,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Clay']
    },
    soilPh: {
      min: 6.0,
      max: 7.5,
      average: 6.8
    },
    waterAvailability: 'High',
    majorCrops: ['Rice', 'Potato', 'Wheat', 'Maize']
  },
  {
    state: 'Andhra Pradesh',
    districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
    climate: 'Tropical',
    averageRainfall: 900,
    averageTemperature: 29,
    soilType: {
      primary: 'Black',
      secondary: ['Red', 'Alluvial']
    },
    soilPh: {
      min: 6.0,
      max: 7.5,
      average: 6.7
    },
    waterAvailability: 'Medium',
    majorCrops: ['Groundnut', 'Chilli', 'Rice', 'Cotton']
  },
  {
    state: 'Chhattisgarh',
    districts: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
    climate: 'Tropical',
    averageRainfall: 1300,
    averageTemperature: 27,
    soilType: {
      primary: 'Clay',
      secondary: ['Red', 'Laterite']
    },
    soilPh: {
      min: 5.5,
      max: 7.0,
      average: 6.3
    },
    waterAvailability: 'High',
    majorCrops: ['Rice', 'Maize', 'Wheat', 'Gram']
  },
  {
    state: 'Odisha',
    districts: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur'],
    climate: 'Tropical',
    averageRainfall: 1450,
    averageTemperature: 28,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Clay', 'Red']
    },
    soilPh: {
      min: 5.8,
      max: 7.2,
      average: 6.5
    },
    waterAvailability: 'High',
    majorCrops: ['Rice', 'Wheat', 'Pulses', 'Oilseeds']
  },
  {
    state: 'Assam',
    districts: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon'],
    climate: 'Tropical Monsoon',
    averageRainfall: 2200,
    averageTemperature: 25,
    soilType: {
      primary: 'Alluvial',
      secondary: ['Loamy']
    },
    soilPh: {
      min: 4.5,
      max: 6.5,
      average: 5.5
    },
    waterAvailability: 'Very High',
    majorCrops: ['Tea', 'Rice', 'Jute', 'Oilseeds']
  },
  {
    state: 'Telangana',
    districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    climate: 'Tropical',
    averageRainfall: 850,
    averageTemperature: 28,
    soilType: {
      primary: 'Black',
      secondary: ['Red']
    },
    soilPh: {
      min: 6.0,
      max: 7.8,
      average: 6.9
    },
    waterAvailability: 'Medium',
    majorCrops: ['Rice', 'Cotton', 'Maize', 'Jowar']
  }
];

// Sample crops data
const cropsData = [
  {
    name: 'Rice',
    hindiName: 'चावल',
    season: 'Kharif',
    suitableStates: ['Punjab', 'West Bengal', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh'],
    minTemperature: 20,
    maxTemperature: 35,
    minRainfall: 1000,
    maxRainfall: 2000,
    soilTypes: ['Alluvial', 'Clay'],
    soilPhMin: 5.5,
    soilPhMax: 7.0,
    waterRequirement: 'High',
    irrigationPercentage: 80,
    fertilizerTypes: ['NPK', 'Urea', 'DAP'],
    fertilizerGuidance: 'बुवाई के समय: DAP (18:46:0) 50-60 किग्रा/एकड़। वृद्धि के दौरान: यूरिया (46:0:0) 40-50 किग्रा/एकड़ दो बार डालें।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September', 'October'],
    harvestingMonths: ['October', 'November'],
    duration: 120,
    yield: '40-50 quintals/hectare',
    description: 'Rice is a staple food crop in India, grown mainly in Kharif season.'
  },
  {
    name: 'Wheat',
    hindiName: 'गेहूं',
    season: 'Rabi',
    suitableStates: ['Punjab', 'Uttar Pradesh', 'Haryana', 'Rajasthan', 'Madhya Pradesh'],
    minTemperature: 10,
    maxTemperature: 25,
    minRainfall: 400,
    maxRainfall: 900,
    soilTypes: ['Alluvial', 'Loamy'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 60,
    fertilizerTypes: ['NPK', 'Urea', 'DAP'],
    fertilizerGuidance: 'बुवाई के समय: संतुलित NPK (10:26:26) 50-60 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 30-40 किग्रा/एकड़ टॉप ड्रेसिंग।',
    sowingMonths: ['November', 'December'],
    growthMonths: ['January', 'February', 'March'],
    harvestingMonths: ['March', 'April'],
    duration: 120,
    yield: '45-50 quintals/hectare',
    description: 'Wheat is the main Rabi crop, providing food security.'
  },
  {
    name: 'Cotton',
    hindiName: 'कपास',
    season: 'Kharif',
    suitableStates: ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'Tamil Nadu'],
    minTemperature: 21,
    maxTemperature: 35,
    minRainfall: 500,
    maxRainfall: 1200,
    soilTypes: ['Black', 'Alluvial'],
    soilPhMin: 6.0,
    soilPhMax: 8.0,
    waterRequirement: 'Medium',
    irrigationPercentage: 65,
    fertilizerTypes: ['NPK', 'Urea', 'Potash'],
    fertilizerGuidance: 'बुवाई के समय: NPK (12:32:16) 60-70 किग्रा/एकड़। फूल आने के समय: यूरिया 25-30 किग्रा/एकड़।',
    sowingMonths: ['May', 'June'],
    growthMonths: ['July', 'August', 'September'],
    harvestingMonths: ['October', 'November', 'December'],
    duration: 150,
    yield: '15-20 quintals/hectare',
    description: 'Cotton is a major cash crop and fiber crop.'
  },
  {
    name: 'Sugarcane',
    hindiName: 'गन्ना',
    season: 'All',
    suitableStates: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Punjab'],
    minTemperature: 20,
    maxTemperature: 35,
    minRainfall: 750,
    maxRainfall: 1500,
    soilTypes: ['Alluvial', 'Black', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'High',
    irrigationPercentage: 85,
    fertilizerTypes: ['NPK', 'Urea', 'Potash'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 100-120 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 50-60 किग्रा/एकड़ दो बार।',
    sowingMonths: ['February', 'March', 'October', 'November'],
    growthMonths: ['April', 'May', 'June', 'July', 'August', 'September'],
    harvestingMonths: ['December', 'January', 'February', 'March'],
    duration: 300,
    yield: '700-800 quintals/hectare',
    description: 'Sugarcane is a long-duration crop used for sugar production.'
  },
  {
    name: 'Groundnut',
    hindiName: 'मूंगफली',
    season: 'Kharif',
    suitableStates: ['Gujarat', 'Tamil Nadu', 'Andhra Pradesh', 'Karnataka', 'Rajasthan'],
    minTemperature: 20,
    maxTemperature: 30,
    minRainfall: 500,
    maxRainfall: 1000,
    soilTypes: ['Sandy', 'Loamy', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.0,
    waterRequirement: 'Low',
    irrigationPercentage: 50,
    fertilizerTypes: ['NPK', 'Gypsum'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 40-50 किग्रा/एकड़। फूल आने के समय: जिप्सम 200-250 किग्रा/एकड़।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['October', 'November'],
    duration: 100,
    yield: '20-25 quintals/hectare',
    description: 'Groundnut is an important oilseed and food crop.'
  },
  {
    name: 'Soybean',
    hindiName: 'सोयाबीन',
    season: 'Kharif',
    suitableStates: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka'],
    minTemperature: 15,
    maxTemperature: 30,
    minRainfall: 600,
    maxRainfall: 1000,
    soilTypes: ['Black', 'Alluvial', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 55,
    fertilizerTypes: ['NPK', 'Rhizobium'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 40-50 किग्रा/एकड़। राइजोबियम कल्चर का उपयोग करें।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['October', 'November'],
    duration: 90,
    yield: '25-30 quintals/hectare',
    description: 'Soybean is a protein-rich legume crop.'
  },
  {
    name: 'Mustard',
    hindiName: 'सरसों',
    season: 'Rabi',
    suitableStates: ['Rajasthan', 'Uttar Pradesh', 'Haryana', 'Punjab', 'Gujarat'],
    minTemperature: 10,
    maxTemperature: 25,
    minRainfall: 300,
    maxRainfall: 700,
    soilTypes: ['Alluvial', 'Loamy', 'Sandy'],
    soilPhMin: 6.5,
    soilPhMax: 8.0,
    waterRequirement: 'Low',
    irrigationPercentage: 45,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 40-50 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 20-25 किग्रा/एकड़।',
    sowingMonths: ['October', 'November'],
    growthMonths: ['December', 'January', 'February'],
    harvestingMonths: ['February', 'March'],
    duration: 120,
    yield: '15-20 quintals/hectare',
    description: 'Mustard is an important oilseed crop for Rabi season.'
  },
  {
    name: 'Potato',
    hindiName: 'आलू',
    season: 'Rabi',
    suitableStates: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar', 'Gujarat'],
    minTemperature: 15,
    maxTemperature: 25,
    minRainfall: 500,
    maxRainfall: 1000,
    soilTypes: ['Alluvial', 'Sandy Loam'],
    soilPhMin: 5.5,
    soilPhMax: 7.0,
    waterRequirement: 'Medium',
    irrigationPercentage: 70,
    fertilizerTypes: ['NPK', 'Potash'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 60-70 किग्रा/एकड़। कंद बनने के समय: पोटाश 30-40 किग्रा/एकड़।',
    sowingMonths: ['October', 'November'],
    growthMonths: ['December', 'January', 'February'],
    harvestingMonths: ['February', 'March'],
    duration: 90,
    yield: '250-300 quintals/hectare',
    description: 'Potato is a major vegetable crop in India.'
  },
  {
    name: 'Bajra (Pearl Millet)',
    hindiName: 'बाजरा',
    season: 'Kharif',
    suitableStates: ['Rajasthan', 'Haryana', 'Gujarat', 'Maharashtra'],
    minTemperature: 25,
    maxTemperature: 38,
    minRainfall: 400,
    maxRainfall: 600,
    soilTypes: ['Sandy', 'Loamy'],
    soilPhMin: 6.0,
    soilPhMax: 8.0,
    waterRequirement: 'Low',
    irrigationPercentage: 40,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (12:32:16) 30-40 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 20-25 किग्रा/एकड़।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['September', 'October'],
    duration: 75,
    yield: '10-15 quintals/hectare',
    description: 'Bajra is a drought-resistant millet crop suitable for arid regions.'
  },
  {
    name: 'Jowar (Sorghum)',
    hindiName: 'ज्वार',
    season: 'Kharif',
    suitableStates: ['Maharashtra', 'Karnataka', 'Telangana', 'Madhya Pradesh'],
    minTemperature: 20,
    maxTemperature: 35,
    minRainfall: 400,
    maxRainfall: 800,
    soilTypes: ['Black', 'Loamy'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Low',
    irrigationPercentage: 45,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 40-50 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 25-30 किग्रा/एकड़।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['October', 'November'],
    duration: 110,
    yield: '15-20 quintals/hectare',
    description: 'Jowar is a versatile grain crop suitable for both Kharif and Rabi seasons.'
  },
  {
    name: 'Gram (Chickpea)',
    hindiName: 'चना',
    season: 'Rabi',
    suitableStates: ['Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Maharashtra'],
    minTemperature: 10,
    maxTemperature: 30,
    minRainfall: 400,
    maxRainfall: 600,
    soilTypes: ['Loamy', 'Black'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Low',
    irrigationPercentage: 35,
    fertilizerTypes: ['NPK', 'DAP'],
    fertilizerGuidance: 'बुवाई के समय: DAP (18:46:0) 30-40 किग्रा/एकड़। राइजोबियम कल्चर का उपयोग करें।',
    sowingMonths: ['October', 'November'],
    growthMonths: ['December', 'January', 'February'],
    harvestingMonths: ['February', 'March'],
    duration: 120,
    yield: '15-20 quintals/hectare',
    description: 'Gram is an important pulse crop rich in protein.'
  },
  {
    name: 'Arhar (Pigeon Pea)',
    hindiName: 'अरहर / तुअर',
    season: 'Kharif',
    suitableStates: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
    minTemperature: 20,
    maxTemperature: 35,
    minRainfall: 600,
    maxRainfall: 1000,
    soilTypes: ['Loamy', 'Red', 'Black'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 50,
    fertilizerTypes: ['NPK', 'Rhizobium'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 30-40 किग्रा/एकड़। राइजोबियम कल्चर उपयोग करें।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September', 'October', 'November'],
    harvestingMonths: ['December', 'January'],
    duration: 180,
    yield: '10-15 quintals/hectare',
    description: 'Arhar is a long-duration pulse crop with good drought tolerance.'
  },
  {
    name: 'Moong (Green Gram)',
    hindiName: 'मूंग',
    season: 'Zaid',
    suitableStates: ['Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Maharashtra'],
    minTemperature: 25,
    maxTemperature: 35,
    minRainfall: 300,
    maxRainfall: 600,
    soilTypes: ['Sandy', 'Loamy'],
    soilPhMin: 6.5,
    soilPhMax: 7.5,
    waterRequirement: 'Low',
    irrigationPercentage: 40,
    fertilizerTypes: ['NPK', 'Rhizobium'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 25-30 किग्रा/एकड़। राइजोबियम कल्चर का उपयोग।',
    sowingMonths: ['March', 'April'],
    growthMonths: ['May', 'June'],
    harvestingMonths: ['June', 'July'],
    duration: 60,
    yield: '8-12 quintals/hectare',
    description: 'Moong is a short-duration pulse crop ideal for summer season.'
  },
  {
    name: 'Urad (Black Gram)',
    hindiName: 'उड़द',
    season: 'Kharif',
    suitableStates: ['Uttar Pradesh', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan'],
    minTemperature: 25,
    maxTemperature: 35,
    minRainfall: 600,
    maxRainfall: 1000,
    soilTypes: ['Loamy', 'Black'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 50,
    fertilizerTypes: ['NPK', 'Rhizobium'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 30-35 किग्रा/एकड़। राइजोबियम कल्चर का उपयोग करें।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['September', 'October'],
    duration: 90,
    yield: '8-10 quintals/hectare',
    description: 'Urad is an important pulse crop used in various Indian dishes.'
  },
  {
    name: 'Sunflower',
    hindiName: 'सूरजमुखी',
    season: 'Kharif',
    suitableStates: ['Karnataka', 'Andhra Pradesh', 'Maharashtra', 'Tamil Nadu'],
    minTemperature: 18,
    maxTemperature: 30,
    minRainfall: 400,
    maxRainfall: 800,
    soilTypes: ['Loamy', 'Black', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 55,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (12:32:16) 50-60 किग्रा/एकड़। फूल आने पर: यूरिया 25-30 किग्रा/एकड़।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['October', 'November'],
    duration: 90,
    yield: '15-20 quintals/hectare',
    description: 'Sunflower is an important oilseed crop with good market value.'
  },
  {
    name: 'Sesame (Til)',
    hindiName: 'तिल',
    season: 'Kharif',
    suitableStates: ['Rajasthan', 'Madhya Pradesh', 'Uttar Pradesh', 'Gujarat'],
    minTemperature: 25,
    maxTemperature: 35,
    minRainfall: 400,
    maxRainfall: 700,
    soilTypes: ['Loamy', 'Sandy'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Low',
    irrigationPercentage: 40,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 30-40 किग्रा/एकड़। फूल आने पर: यूरिया 15-20 किग्रा/एकड़।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['August', 'September'],
    harvestingMonths: ['September', 'October'],
    duration: 85,
    yield: '5-8 quintals/hectare',
    description: 'Sesame is a drought-tolerant oilseed crop.'
  },
  {
    name: 'Barley',
    hindiName: 'जौ',
    season: 'Rabi',
    suitableStates: ['Uttar Pradesh', 'Rajasthan', 'Haryana', 'Punjab', 'Bihar'],
    minTemperature: 10,
    maxTemperature: 25,
    minRainfall: 300,
    maxRainfall: 600,
    soilTypes: ['Sandy', 'Loamy'],
    soilPhMin: 6.5,
    soilPhMax: 8.0,
    waterRequirement: 'Low',
    irrigationPercentage: 35,
    fertilizerTypes: ['NPK', 'Urea'],
    fertilizerGuidance: 'बुवाई के समय: NPK (10:26:26) 40-50 किग्रा/एकड़। वृद्धि के दौरान: यूरिया 20-25 किग्रा/एकड़।',
    sowingMonths: ['November', 'December'],
    growthMonths: ['January', 'February'],
    harvestingMonths: ['March', 'April'],
    duration: 120,
    yield: '25-30 quintals/hectare',
    description: 'Barley is a hardy cereal crop suitable for low-rainfall areas.'
  },
  {
    name: 'Onion',
    hindiName: 'प्याज',
    season: 'Rabi',
    suitableStates: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat', 'Tamil Nadu'],
    minTemperature: 15,
    maxTemperature: 30,
    minRainfall: 400,
    maxRainfall: 800,
    soilTypes: ['Loamy', 'Red', 'Black'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 65,
    fertilizerTypes: ['NPK', 'Urea', 'Potash'],
    fertilizerGuidance: 'रोपण के समय: NPK (10:26:26) 50-60 किग्रा/एकड़। कंद बनने पर: पोटाश 30-40 किग्रा/एकड़।',
    sowingMonths: ['October', 'November', 'June', 'July'],
    growthMonths: ['December', 'January', 'August', 'September'],
    harvestingMonths: ['February', 'March', 'October', 'November'],
    duration: 120,
    yield: '200-250 quintals/hectare',
    description: 'Onion is a major vegetable crop grown in both Kharif and Rabi seasons.'
  },
  {
    name: 'Tomato',
    hindiName: 'टमाटर',
    season: 'All',
    suitableStates: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Andhra Pradesh', 'Gujarat'],
    minTemperature: 18,
    maxTemperature: 27,
    minRainfall: 500,
    maxRainfall: 1000,
    soilTypes: ['Loamy', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.0,
    waterRequirement: 'High',
    irrigationPercentage: 75,
    fertilizerTypes: ['NPK', 'Urea', 'Organic'],
    fertilizerGuidance: 'रोपण के समय: कम्पोस्ट 200-250 किग्रा/एकड़ + NPK (19:19:19) 60-70 किग्रा/एकड़। फल बनने पर: यूरिया 20-25 किग्रा/एकड़।',
    sowingMonths: ['All months'],
    growthMonths: ['Year-round'],
    harvestingMonths: ['Year-round'],
    duration: 75,
    yield: '300-400 quintals/hectare',
    description: 'Tomato is a versatile vegetable crop grown throughout the year.'
  },
  {
    name: 'Chilli',
    hindiName: 'मिर्च',
    season: 'Kharif',
    suitableStates: ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra'],
    minTemperature: 20,
    maxTemperature: 35,
    minRainfall: 600,
    maxRainfall: 1200,
    soilTypes: ['Black', 'Loamy', 'Red'],
    soilPhMin: 6.0,
    soilPhMax: 7.5,
    waterRequirement: 'Medium',
    irrigationPercentage: 60,
    fertilizerTypes: ['NPK', 'Organic'],
    fertilizerGuidance: 'रोपण के समय: कम्पोस्ट 150-200 किग्रा/एकड़ + NPK (12:32:16) 50-60 किग्रा/एकड़। फल बनने पर: यूरिया 25-30 किग्रा/एकड़।',
    sowingMonths: ['June', 'July', 'October', 'November'],
    growthMonths: ['August', 'September', 'December', 'January'],
    harvestingMonths: ['October', 'November', 'February', 'March'],
    duration: 150,
    yield: '40-50 quintals/hectare',
    description: 'Chilli is an important spice crop grown in hot and humid regions.'
  },
  {
    name: 'Tea',
    hindiName: 'चाय',
    season: 'All',
    suitableStates: ['Assam', 'West Bengal', 'Kerala', 'Tamil Nadu', 'Karnataka'],
    minTemperature: 20,
    maxTemperature: 30,
    minRainfall: 1500,
    maxRainfall: 3000,
    soilTypes: ['Laterite', 'Red'],
    soilPhMin: 4.5,
    soilPhMax: 6.0,
    waterRequirement: 'High',
    irrigationPercentage: 80,
    fertilizerTypes: ['NPK', 'Organic', 'Urea'],
    fertilizerGuidance: 'हर महीने: NPK (15:15:15) 50-60 किग्रा/एकड़। कम्पोस्ट 200-250 किग्रा/एकड़ साल में दो बार।',
    sowingMonths: ['Year-round'],
    growthMonths: ['Year-round'],
    harvestingMonths: ['Year-round'],
    duration: 365,
    yield: 'Continuous plucking',
    description: 'Tea is a perennial plantation crop requiring high rainfall and acidic soil.'
  },
  {
    name: 'Coffee',
    hindiName: 'कॉफी',
    season: 'All',
    suitableStates: ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh'],
    minTemperature: 18,
    maxTemperature: 28,
    minRainfall: 1500,
    maxRainfall: 2500,
    soilTypes: ['Red', 'Laterite'],
    soilPhMin: 5.5,
    soilPhMax: 6.5,
    waterRequirement: 'High',
    irrigationPercentage: 75,
    fertilizerTypes: ['NPK', 'Organic', 'Lime'],
    fertilizerGuidance: 'बारिश से पहले: NPK (10:26:26) 100-150 किग्रा/एकड़। कम्पोस्ट 300-400 किग्रा/एकड़ साल में एक बार।',
    sowingMonths: ['June', 'July'],
    growthMonths: ['Year-round'],
    harvestingMonths: ['November', 'December', 'January', 'February'],
    duration: 365,
    yield: '800-1000 kg/hectare',
    description: 'Coffee is a perennial plantation crop grown in hill areas with good drainage.'
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrowcrop');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Crop.deleteMany({});
    await Region.deleteMany({});
    console.log('Cleared existing data');

    // Insert regions
    const regions = await Region.insertMany(regionsData);
    console.log(`Inserted ${regions.length} regions`);

    // Insert crops
    const crops = await Crop.insertMany(cropsData);
    console.log(`Inserted ${crops.length} crops`);

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();


