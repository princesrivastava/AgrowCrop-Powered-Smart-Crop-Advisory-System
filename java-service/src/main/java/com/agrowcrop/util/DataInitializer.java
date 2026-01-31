package com.agrowcrop.util;

import com.agrowcrop.model.Crop;
import com.agrowcrop.model.CropData;
import com.agrowcrop.model.FAQ;
import com.agrowcrop.model.Region;
import com.agrowcrop.repository.CropDataRepository;
import com.agrowcrop.repository.CropRepository;
import com.agrowcrop.repository.FAQRepository;
import com.agrowcrop.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CropRepository cropRepository;
    private final RegionRepository regionRepository;
    private final FAQRepository faqRepository;
    private final CropDataRepository cropDataRepository;

    @Override
    public void run(String... args) throws Exception {
        if (cropRepository.count() == 0) {
            seedCrops();
        }
        seedRegions();
        // Re-seed FAQs if we have the initial small set (<= 3) or empty
        if (faqRepository.count() <= 5) {
            faqRepository.deleteAll();
            seedFaqs();
        }
        if (cropDataRepository.count() == 0) {
            importCropDataFromCsv();
        }
    }

    private void seedCrops() {
        log.info("Seeding crops...");
        List<Crop> crops = new ArrayList<>();

        crops.add(createCrop("Rice", "धान", "Kharif",
                Arrays.asList("Punjab", "West Bengal", "Tamil Nadu", "Karnataka", "Uttar Pradesh"),
                20.0, 35.0, 1000.0, 2000.0, Arrays.asList("Alluvial", "Clay"), 5.5, 7.0, "High", 80,
                Arrays.asList("June", "July"), Arrays.asList("August", "September", "October"),
                Arrays.asList("October", "November"), 120, "40-50 quintals/hectare"));

        crops.add(createCrop("Wheat", "गेहूं", "Rabi",
                Arrays.asList("Punjab", "Uttar Pradesh", "Haryana", "Rajasthan", "Madhya Pradesh"),
                10.0, 25.0, 400.0, 900.0, Arrays.asList("Alluvial", "Loamy"), 6.0, 7.5, "Medium", 60,
                Arrays.asList("November", "December"), Arrays.asList("January", "February", "March"),
                Arrays.asList("March", "April"), 120, "45-50 quintals/hectare"));

        crops.add(createCrop("Cotton", "कपास", "Kharif",
                Arrays.asList("Gujarat", "Maharashtra", "Telangana", "Andhra Pradesh", "Haryana"),
                20.0, 32.0, 500.0, 1000.0, Arrays.asList("Black", "Alluvial"), 6.0, 8.0, "Medium", 50,
                Arrays.asList("May", "June"), Arrays.asList("July", "August", "September"),
                Arrays.asList("October", "November", "December"), 180, "20-25 quintals/hectare"));

        crops.add(createCrop("Maize", "मक्का", "Kharif",
                Arrays.asList("Karnataka", "Madhya Pradesh", "Bihar", "Tamil Nadu", "Rajasthan"),
                18.0, 30.0, 600.0, 1200.0, Arrays.asList("Alluvial", "Red"), 5.5, 7.5, "Medium", 60,
                Arrays.asList("June", "July"), Arrays.asList("August", "September"),
                Arrays.asList("September", "October"), 110, "30-40 quintals/hectare"));

        crops.add(createCrop("Jowar", "ज्वार", "Kharif",
                Arrays.asList("Maharashtra", "Karnataka", "Rajasthan", "Tamil Nadu", "Andhra Pradesh"),
                25.0, 35.0, 400.0, 700.0, Arrays.asList("Black", "Alluvial", "Red"), 6.0, 8.0, "Low", 40,
                Arrays.asList("June", "July"), Arrays.asList("August", "September"),
                Arrays.asList("October", "November"), 115, "15-20 quintals/hectare"));

        cropRepository.saveAll(crops);
        log.info("Crops seeded: {}", crops.size());
    }

    private Crop createCrop(String name, String hindiName, String season, List<String> states,
            Double minTemp, Double maxTemp, Double minRain, Double maxRain,
            List<String> soils, Double phMin, Double phMax, String water, Integer irrigation,
            List<String> sowing, List<String> growth, List<String> harvesting, Integer duration, String yield) {
        Crop crop = new Crop();
        crop.setName(name);
        crop.setHindiName(hindiName);
        crop.setSeason(season);
        crop.setSuitableStates(states);
        crop.setMinTemperature(minTemp);
        crop.setMaxTemperature(maxTemp);
        crop.setMinRainfall(minRain);
        crop.setMaxRainfall(maxRain);
        crop.setSoilTypes(soils);
        crop.setSoilPhMin(phMin);
        crop.setSoilPhMax(phMax);
        crop.setWaterRequirement(water);
        crop.setIrrigationPercentage(irrigation);
        crop.setSowingMonths(sowing);
        crop.setGrowthMonths(growth);
        crop.setHarvestingMonths(harvesting);
        crop.setDuration(duration);
        crop.setYield(yield);
        return crop;
    }

    private void seedRegions() {
        log.info("Seeding regions...");
        List<Region> regions = new ArrayList<>();

        regions.add(createRegion("Punjab", Arrays.asList("Amritsar", "Ludhiana", "Jalandhar"), "Subtropical", 600.0,
                25.0, "Alluvial", "High", 6.5, 7.5));
        regions.add(createRegion("Maharashtra", Arrays.asList("Mumbai", "Pune", "Nagpur"), "Tropical", 1200.0, 28.0,
                "Black", "Medium", 6.0, 7.5));
        regions.add(createRegion("Uttar Pradesh", Arrays.asList("Lucknow", "Kanpur", "Varanasi"), "Subtropical", 950.0,
                26.0, "Alluvial", "High", 6.0, 7.5));
        regions.add(createRegion("Gujarat", Arrays.asList("Ahmedabad", "Surat", "Rajkot"), "Arid", 800.0, 30.0,
                "Alluvial", "Medium", 6.5, 8.0));
        regions.add(createRegion("Karnataka", Arrays.asList("Bangalore", "Mysore", "Hubli"), "Tropical", 1100.0, 25.0,
                "Red", "Medium", 5.5, 7.0));
        // Add Himachal Pradesh
        regions.add(
                createRegion("Himachal Pradesh", Arrays.asList("Shimla", "Manali", "Dharamshala"), "Temperate", 1500.0,
                        15.0, "Loamy", "High", 5.5, 6.5));

        // Add Madhya Pradesh
        regions.add(createRegion("Madhya Pradesh", Arrays.asList("Bhopal", "Indore", "Jabalpur"), "Subtropical", 1000.0,
                25.0, "Black", "Medium", 6.0, 7.5));

        for (Region region : regions) {
            if (regionRepository.findByStateIgnoreCase(region.getState()).isEmpty()) {
                regionRepository.save(region);
                log.info("Seeded region: {}", region.getState());
            }
        }
    }

    private Region createRegion(String state, List<String> districts, String climate, Double rainfall, Double temp,
            String primarySoil, String water, Double phMin, Double phMax) {
        Region region = new Region();
        region.setState(state);
        region.setDistricts(districts);
        region.setClimate(climate);
        region.setAverageRainfall(rainfall);
        region.setAverageTemperature(temp);
        region.setWaterAvailability(water);
        region.setSoilType(new Region.SoilType(primarySoil, new ArrayList<>()));
        region.setSoilPh(new Region.SoilPh(phMin, phMax, (phMin + phMax) / 2));
        return region;
    }

    private void seedFaqs() {
        log.info("Seeding FAQs...");
        List<FAQ> faqs = new ArrayList<>();

        // General
        faqs.add(new FAQ(null, 1, "क्या AgrowCrop मुफ्त है?", "हाँ, AgrowCrop पूरी तरह से मुफ्त है।", "General"));
        faqs.add(new FAQ(null, 2, "How do I contact support?",
                "You can email us at support@agrowcrop.com for any assistance.", "General"));

        // Crop Selection
        faqs.add(new FAQ(null, 3, "मैं अपने क्षेत्र के लिए सबसे अच्छी फसल कैसे चुनूं?", "बस अपना राज्य और मौसम चुनें।",
                "Crop Selection"));
        faqs.add(new FAQ(null, 4, "What data is used for recommendations?",
                "We use soil, weather, and historical yield data to provide accurate recommendations.",
                "Crop Selection"));

        // Irrigation
        faqs.add(new FAQ(null, 5, "गेहूं के लिए कितना पानी चाहिए?",
                "गेहूं को मध्यम सिंचाई की आवश्यकता होती है, विशेष रूप से बुवाई और फूल आने के दौरान।", "Irrigation"));
        faqs.add(new FAQ(null, 6, "Benefits of drip irrigation?",
                "Drip irrigation saves water, reduces weed growth, and improves fertilizer efficiency.", "Irrigation"));

        // Fertilizer
        faqs.add(new FAQ(null, 7, "जैविक खाद का उपयोग क्यों करें?",
                "जैविक खाद मिट्टी की उर्वरता बनाए रखती है और पर्यावरण के अनुकूल है।", "Fertilizer"));
        faqs.add(new FAQ(null, 8, "When to apply Nitrogen?",
                "Nitrogen should be applied in split doses during the vegetative growth stage for best results.",
                "Fertilizer"));

        // Soil
        faqs.add(new FAQ(null, 9, "काली मिट्टी किस फसल के लिए अच्छी है?",
                "काली मिट्टी कपास और सोयाबीन की खेती के लिए उत्कृष्ट है।", "Soil"));
        faqs.add(new FAQ(null, 10, "How to test soil pH?",
                "You can use a digital pH meter or send a soil sample to your local agriculture lab.", "Soil"));

        // Calendar
        faqs.add(new FAQ(null, 11, "फसल कैलेंडर क्या है?", "यह बुवाई से लेकर कटाई तक की गतिविधियों का एक शेड्यूल है।",
                "Calendar"));
        faqs.add(new FAQ(null, 12, "Best time for Rabi crops?",
                "Rabi crops are typically sown in winter (October-November) and harvested in spring.", "Calendar"));

        // Comparison
        faqs.add(new FAQ(null, 13, "क्या मैं दो फसलों की तुलना कर सकता हूँ?",
                "हाँ, आप 'Comparison' टूल का उपयोग करके उपज और बाजार मूल्य की तुलना कर सकते हैं।", "Comparison"));
        faqs.add(new FAQ(null, 14, "Which crop gives better profit?",
                "Profitability depends on current market prices and yield. Use our Market Price tool to check.",
                "Comparison"));

        // Accuracy
        faqs.add(new FAQ(null, 15, "क्या मौसम का पूर्वानुमान सटीक है?",
                "हम विश्वसनीय मौसम विभाग के डेटा का उपयोग करते हैं, लेकिन स्थानीय कारक भिन्न हो सकते हैं।",
                "Accuracy"));
        faqs.add(new FAQ(null, 16, "How reliable are the predictions?",
                "Our AI models are trained on extensive datasets and have an accuracy rate of over 90%.", "Accuracy"));

        faqRepository.saveAll(faqs);
        log.info("FAQs seeded: {}", faqs.size());
    }

    private void importCropDataFromCsv() {
        log.info("Importing crop data from CSV...");
        // Path relative to where the jar runs (usually root of java-service if running
        // with ./mvnw)
        String csvFile = "../backend/data/Crop_recommendation.csv"; // Adjusted path to original csv location if
                                                                    // possible
        if (!Files.exists(Paths.get(csvFile))) {
            csvFile = "Crop_recommendation.csv"; // fallback
        }

        Path path = Paths.get(csvFile);
        if (!Files.exists(path)) {
            // Try one more common location
            csvFile = "../Crop_recommendation.csv";
            path = Paths.get(csvFile);
        }

        if (!Files.exists(path)) {
            log.warn("CSV file not found at any location. Skipping import.");
            return;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String line;
            br.readLine(); // skip header
            List<CropData> dataList = new ArrayList<>();
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                if (values.length < 8)
                    continue;
                CropData data = new CropData();
                data.setN(Double.parseDouble(values[0]));
                data.setP(Double.parseDouble(values[1]));
                data.setK(Double.parseDouble(values[2]));
                data.setTemperature(Double.parseDouble(values[3]));
                data.setHumidity(Double.parseDouble(values[4]));
                data.setPh(Double.parseDouble(values[5]));
                data.setRainfall(Double.parseDouble(values[6]));
                data.setLabel(values[7].toLowerCase().trim());
                dataList.add(data);

                if (dataList.size() >= 100) {
                    cropDataRepository.saveAll(dataList);
                    dataList.clear();
                }
            }
            if (!dataList.isEmpty()) {
                cropDataRepository.saveAll(dataList);
            }
            log.info("Crop data imported successfully.");
        } catch (Exception e) {
            log.error("Error importing crop data: {}", e.getMessage());
        }
    }
}
