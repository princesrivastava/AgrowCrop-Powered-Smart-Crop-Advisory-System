package com.agrowcrop.util;

import java.util.*;

public class DataStore {
        private static final List<Map<String, Object>> CROPS = new ArrayList<>();
        private static final Map<String, Map<String, Object>> REGIONS = new HashMap<>();

        static {
                // Initialize sample crops
                addCrop("Rice", "धान", "Kharif", "Tropical", 20.0, 35.0, 1000.0, 2500.0,
                                Arrays.asList("Alluvial", "Clay"), 6.0, 7.5, 80, "High",
                                "Needs plenty of water and warm climate.",
                                Arrays.asList("Punjab", "Haryana", "West Bengal", "Uttar Pradesh", "Andhra Pradesh"),
                                Arrays.asList("June", "July"), Arrays.asList("November", "December"), 120,
                                "20-25 quintal/acre",
                                "Rice is the staple food of India, primarily grown in areas with high rainfall or assured irrigation.");

                addCrop("Wheat", "गेहूं", "Rabi", "Temperate", 10.0, 25.0, 400.0, 800.0,
                                Arrays.asList("Alluvial", "Loamy"), 6.0, 7.5, 75, "Medium",
                                "Best grown in winter with moderate water.",
                                Arrays.asList("Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"),
                                Arrays.asList("October", "November"), Arrays.asList("March", "April"), 140,
                                "15-20 quintal/acre",
                                "Wheat is a winter crop requiring a cool growing season and bright sunshine at harvesting.");

                addCrop("Maize", "मक्का", "Kharif", "Tropical", 18.0, 30.0, 500.0, 1000.0,
                                Arrays.asList("Alluvial", "Red"), 5.5, 7.0, 70, "Medium",
                                "Versatile crop, grows well in well-drained soil.",
                                Arrays.asList("Karnataka", "Madhya Pradesh", "Bihar", "Andhra Pradesh", "Rajasthan"),
                                Arrays.asList("June", "July"), Arrays.asList("September", "October"), 100,
                                "10-15 quintal/acre",
                                "Maize is used as both food and fodder, growing well in old alluvial soil.");

                addCrop("Mustard", "सरसों", "Rabi", "Temperate", 10.0, 20.0, 300.0, 600.0,
                                Arrays.asList("Alluvial", "Sandy"), 6.0, 7.5, 65, "Low",
                                "Requires cool climate and low water.",
                                Arrays.asList("Rajasthan", "Haryana", "Madhya Pradesh", "Uttar Pradesh", "West Bengal"),
                                Arrays.asList("October", "November"), Arrays.asList("February", "March"), 110,
                                "5-8 quintal/acre",
                                "Mustard is an important oilseed crop grown in temperate climates.");

                addCrop("Chickpea", "चना", "Rabi", "Temperate", 15.0, 25.0, 400.0, 600.0,
                                Arrays.asList("Alluvial", "Black"), 6.0, 7.0, 60, "Low",
                                "Major pulse crop, fixates nitrogen in soil.",
                                Arrays.asList("Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh",
                                                "Karnataka"),
                                Arrays.asList("October", "November"), Arrays.asList("February", "March"), 150,
                                "8-10 quintal/acre",
                                "Chickpea is highly nutritious and a major source of protein.");

                addCrop("Cotton", "कपास", "Kharif", "Tropical", 18.0, 35.0, 600.0, 1000.0,
                                Arrays.asList("Black", "Alluvial", "Red"), 5.5, 8.5, 70, "Medium",
                                "Requires long frost-free periods and bright sunshine.",
                                Arrays.asList("Gujarat", "Maharashtra", "Telangana", "Rajasthan", "Punjab"),
                                Arrays.asList("May", "June"), Arrays.asList("October", "November"), 180,
                                "10-15 quintal/acre",
                                "Cotton is a fiber crop that grows well in the black soil of the Deccan plateau.");

                addCrop("Jute", "जूट", "Kharif", "Tropical", 24.0, 35.0, 1500.0, 2000.0,
                                Arrays.asList("Alluvial", "Clay"), 6.0, 7.5, 85, "High",
                                "Known as the 'Golden Fiber', requires high humidity.",
                                Arrays.asList("West Bengal", "Bihar", "Assam", "Odisha", "Andhra Pradesh"),
                                Arrays.asList("March", "April"), Arrays.asList("August", "September"), 120,
                                "10-12 quintal/acre",
                                "Jute is primarily grown in the fertile plains of the Ganges-Brahmaputra delta.");

                addCrop("Mungbean", "मूंग", "Kharif", "Tropical", 25.0, 35.0, 400.0, 600.0,
                                Arrays.asList("Alluvial", "Black"), 6.0, 7.5, 50, "Low",
                                "Grows fast, can be used for soil improvement.",
                                Arrays.asList("Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Bihar"),
                                Arrays.asList("June", "July"), Arrays.asList("August", "September"), 75,
                                "4-6 quintal/acre",
                                "Mungbean is a short-duration crop that can be grown between main seasons.");

                addCrop("Pigeonpeas", "अरहर/तुअर", "Kharif", "Tropical", 20.0, 30.0, 600.0, 1000.0,
                                Arrays.asList("Alluvial", "Black", "Red"), 6.5, 7.5, 65, "Medium",
                                "Long duration pulse crop, drought resistant.",
                                Arrays.asList("Maharashtra", "Karnataka", "Madhya Pradesh", "Uttar Pradesh", "Gujarat"),
                                Arrays.asList("June", "July"), Arrays.asList("December", "January"), 200,
                                "6-8 quintal/acre",
                                "Pigeonpea is a hardy crop that provides both food and firewood.");

                addCrop("Banana", "केला", "All", "Tropical", 20.0, 32.0, 1500.0, 2500.0,
                                Arrays.asList("Alluvial", "Clay", "Loamy"), 6.0, 7.5, 90, "High",
                                "Needs constant moisture and rich soil.",
                                Arrays.asList("Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh", "Karnataka"),
                                Arrays.asList("All Year"), Arrays.asList("All Year"), 365, "250-300 quintal/acre",
                                "Banana is an important fruit crop that provides high energy and income.");

                addCrop("Papaya", "पपीता", "All", "Tropical", 20.0, 30.0, 1000.0, 1500.0,
                                Arrays.asList("Alluvial", "Loamy"), 6.0, 7.0, 80, "Medium",
                                "Quick growing fruit crop, needs well-drained soil.",
                                Arrays.asList("Andhra Pradesh", "Gujarat", "Karnataka", "Madhya Pradesh",
                                                "Maharashtra"),
                                Arrays.asList("All Year"), Arrays.asList("All Year"), 300, "150-200 quintal/acre",
                                "Papaya is rich in Vitamin A and C, growing best in frost-free climates.");

                // Initialize regions
                addRegion("Haryana", "Dry", 600.0, 25.0, "Alluvial", "Low", 7.0);
                addRegion("Kerala", "Tropical", 2500.0, 28.0, "Laterite", "High", 6.5);
                addRegion("Punjab", "Dry", 700.0, 24.0, "Alluvial", "Medium", 7.2);
                addRegion("West Bengal", "Tropical", 1800.0, 27.0, "Alluvial", "High", 6.8);
                addRegion("Tamil Nadu", "Coastal", 1100.0, 29.0, "Red", "Medium", 6.8);
                addRegion("Maharashtra", "Semi-Arid", 800.0, 27.0, "Black", "Medium", 7.5);
                addRegion("Gujarat", "Arid", 700.0, 28.0, "Black", "Low", 7.8);
                addRegion("Uttar Pradesh", "Humid Subtropical", 950.0, 24.0, "Alluvial", "Medium", 7.0);
                addRegion("Rajasthan", "Arid", 400.0, 32.0, "Sandy", "Low", 8.2);
                addRegion("Karnataka", "Tropical", 1200.0, 26.0, "Red", "Medium", 6.5);
                addRegion("Bihar", "Humid Subtropical", 1100.0, 26.0, "Alluvial", "Medium", 7.0);
                addRegion("Andhra Pradesh", "Coastal", 1000.0, 28.0, "Red", "Medium", 7.2);
                addRegion("Madhya Pradesh", "Semi-Arid", 1000.0, 25.0, "Black", "Medium", 7.5);
        }

        private static void addCrop(String name, String hindiName, String season, String climate,
                        Double minTemp, Double maxTemp, Double minRain, Double maxRain,
                        List<String> soils, Double phMin, Double phMax, Integer irrigation,
                        String water, String guidance, List<String> states,
                        List<String> sowingMonths, List<String> harvestingMonths,
                        Integer duration, String yield, String description) {
                Map<String, Object> crop = new HashMap<>();
                crop.put("name", name);
                crop.put("hindiName", hindiName);
                crop.put("season", season);
                crop.put("climate", climate);
                crop.put("minTemperature", minTemp);
                crop.put("maxTemperature", maxTemp);
                crop.put("minRainfall", minRain);
                crop.put("maxRainfall", maxRain);
                crop.put("soilTypes", soils);
                crop.put("soilPhMin", phMin);
                crop.put("soilPhMax", phMax);
                crop.put("irrigationPercentage", irrigation);
                crop.put("waterRequirement", water);
                crop.put("fertilizerGuidance", guidance);
                crop.put("suitableStates", states);
                crop.put("sowingMonths", sowingMonths);
                crop.put("harvestingMonths", harvestingMonths);
                crop.put("duration", duration);
                crop.put("yield", yield);
                crop.put("description", description);
                CROPS.add(crop);
        }

        private static void addRegion(String state, String climate, Double rainfall, Double temp,
                        String primarySoil, String water, Double avgPh) {
                Map<String, Object> region = new HashMap<>();
                region.put("state", state);
                region.put("climate", climate);
                region.put("averageRainfall", rainfall);
                region.put("averageTemperature", temp);
                region.put("waterAvailability", water);

                Map<String, Object> soilType = new HashMap<>();
                soilType.put("primary", primarySoil);
                region.put("soilType", soilType);

                Map<String, Object> soilPh = new HashMap<>();
                soilPh.put("average", avgPh);
                region.put("soilPh", soilPh);

                REGIONS.put(state, region);
        }

        public static List<Map<String, Object>> getAllCrops() {
                return CROPS;
        }

        public static Map<String, Object> getRegion(String state) {
                return REGIONS.get(state);
        }

        public static List<Map<String, Object>> getAllRegions() {
                return new ArrayList<>(REGIONS.values());
        }
}
