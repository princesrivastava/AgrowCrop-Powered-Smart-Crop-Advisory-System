package com.agrowcrop.service;

import com.agrowcrop.dto.*;
import com.agrowcrop.model.Crop;
import com.agrowcrop.model.Region;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CropRecommendationService {

    public RecommendationResponse generateRecommendations(RecommendationRequest request) {
        List<CropRecommendation> recommendations = new ArrayList<>();

        if (request == null || request.getRegion() == null || request.getCrops() == null) {
            return new RecommendationResponse(new ArrayList<>());
        }

        Region region = request.getRegion();
        String season = request.getSeason();
        List<Crop> crops = request.getCrops();

        // Extract region data using Getters
        String climate = region.getClimate() != null ? region.getClimate() : "";
        Double avgRainfall = region.getAverageRainfall();
        Double avgTemperature = region.getAverageTemperature();

        Region.SoilType soilType = region.getSoilType();
        Region.SoilPh soilPh = region.getSoilPh();
        String waterAvailability = region.getWaterAvailability() != null ? region.getWaterAvailability() : "Medium";
        if (soilType == null)
            soilType = new Region.SoilType();
        if (soilPh == null)
            soilPh = new Region.SoilPh();

        // Analyze each crop
        for (Crop crop : crops) {
            double score = calculateCropScore(crop, climate, avgRainfall, avgTemperature,
                    soilType, soilPh, waterAvailability, season);

            if (score > 50) { // Only recommend crops with score > 50
                CropRecommendation recommendation = new CropRecommendation();
                recommendation.setCrop(crop); // Assuming CropRecommendation updated
                recommendation.setScore(Math.round(score * 100.0) / 100.0);
                recommendation.setIrrigationPercentage(calculateIrrigationPercentage(crop, waterAvailability));
                recommendation.setFertilizerGuidance(generateFertilizerGuidance(crop, soilType, soilPh));
                recommendation.setReasons(generateReasons(crop, climate, avgRainfall, avgTemperature,
                        soilType, soilPh, waterAvailability, season));
                recommendations.add(recommendation);
            }
        }

        // Sort by score descending
        recommendations.sort((a, b) -> Double.compare(b.getScore(), a.getScore()));

        // Return top 10 recommendations
        RecommendationResponse response = new RecommendationResponse();
        response.setRecommendations(recommendations.stream().limit(10).collect(Collectors.toList()));

        return response;
    }

    private double calculateCropScore(Crop crop, String climate,
            Double avgRainfall, Double avgTemperature,
            Region.SoilType soilType, Region.SoilPh soilPh,
            String waterAvailability, String season) {
        double score = 50.0; // Base score

        // Season match (30 points)
        String cropSeason = crop.getSeason() != null ? crop.getSeason() : "";
        if (cropSeason.equals(season) || cropSeason.equals("All")) {
            score += 30;
        }

        // Climate compatibility (20 points)
        if (isClimateCompatible(crop, climate)) {
            score += 20;
        }

        // Temperature match (15 points)
        Double cropMinTemp = crop.getMinTemperature();
        Double cropMaxTemp = crop.getMaxTemperature();
        if (avgTemperature != null && cropMinTemp != null && cropMaxTemp != null) {
            if (avgTemperature >= cropMinTemp && avgTemperature <= cropMaxTemp) {
                score += 15;
            } else {
                double diff = Math.min(Math.abs(avgTemperature - cropMinTemp),
                        Math.abs(avgTemperature - cropMaxTemp));
                score += Math.max(0, 15 - diff * 2);
            }
        }

        // Rainfall match (15 points)
        Double cropMinRain = crop.getMinRainfall();
        Double cropMaxRain = crop.getMaxRainfall();
        if (avgRainfall != null && cropMinRain != null && cropMaxRain != null) {
            if (avgRainfall >= cropMinRain && avgRainfall <= cropMaxRain) {
                score += 15;
            } else {
                double diff = Math.min(Math.abs(avgRainfall - cropMinRain),
                        Math.abs(avgRainfall - cropMaxRain));
                score += Math.max(0, 15 - diff / 10);
            }
        }

        // Soil type match (10 points)
        List<String> cropSoilTypes = crop.getSoilTypes() != null ? crop.getSoilTypes() : new ArrayList<>();
        String primarySoil = soilType.getPrimary() != null ? soilType.getPrimary() : "";
        if (cropSoilTypes.contains(primarySoil)) {
            score += 10;
        }

        // Soil pH match (10 points)
        Double cropPhMin = crop.getSoilPhMin();
        Double cropPhMax = crop.getSoilPhMax();
        Double avgPh = soilPh.getAverage();
        if (avgPh != null && cropPhMin != null && cropPhMax != null) {
            if (avgPh >= cropPhMin && avgPh <= cropPhMax) {
                score += 10;
            }
        }

        // Water availability match (10 points)
        String cropWaterReq = crop.getWaterRequirement() != null ? crop.getWaterRequirement() : "Medium";
        if (waterAvailability.equals(cropWaterReq) ||
                (waterAvailability.equals("High") && !cropWaterReq.equals("Low"))) {
            score += 10;
        }

        return Math.min(100, score);
    }

    private boolean isClimateCompatible(Crop crop, String climate) {
        // Check climate compatibility based on suitable states
        List<String> suitableStates = crop.getSuitableStates() != null ? crop.getSuitableStates() : new ArrayList<>();

        // If no suitable states are defined, the crop is compatible with all regions
        if (suitableStates.isEmpty()) {
            return true;
        }

        return true;
    }

    private int calculateIrrigationPercentage(Crop crop, String waterAvailability) {
        Integer baseIrrigation = crop.getIrrigationPercentage();
        if (baseIrrigation == null) {
            baseIrrigation = 60; // Default
        }

        // Adjust based on water availability
        switch (waterAvailability) {
            case "Low":
                return Math.max(40, baseIrrigation + 20);
            case "High":
                return Math.min(90, baseIrrigation - 10);
            default:
                return baseIrrigation;
        }
    }

    private String generateFertilizerGuidance(Crop crop,
            Region.SoilType soilType,
            Region.SoilPh soilPh) {
        List<String> fertilizerTypes = crop.getFertilizerTypes() != null ? crop.getFertilizerTypes()
                : new ArrayList<>();
        String guidance = crop.getFertilizerGuidance() != null ? crop.getFertilizerGuidance() : "";

        if (!guidance.isEmpty()) {
            return guidance;
        }

        // Generate guidance based on crop and soil
        StringBuilder sb = new StringBuilder();
        sb.append("बुवाई के समय: ");

        if (fertilizerTypes.isEmpty()) {
            sb.append("संतुलित NPK खाद (10:26:26) 50-60 किग्रा/एकड़ डालें। ");
        } else {
            sb.append(String.join(", ", fertilizerTypes)).append(" खाद का उपयोग करें। ");
        }

        Double avgPh = soilPh.getAverage();
        if (avgPh != null) {
            if (avgPh < 6.0) {
                sb.append("मिट्टी अम्लीय है, चूना डालें। ");
            } else if (avgPh > 7.5) {
                sb.append("मिट्टी क्षारीय है, जिप्सम का उपयोग करें। ");
            }
        }

        sb.append("वृद्धि के दौरान: यूरिया (46:0:0) 20-30 किग्रा/एकड़ टॉप ड्रेसिंग के रूप में डालें।");

        return sb.toString();
    }

    private List<String> generateReasons(Crop crop, String climate,
            Double avgRainfall, Double avgTemperature,
            Region.SoilType soilType, Region.SoilPh soilPh,
            String waterAvailability, String season) {
        List<String> reasons = new ArrayList<>();

        String cropSeason = crop.getSeason() != null ? crop.getSeason() : "";
        if (cropSeason.equals(season) || cropSeason.equals("All")) {
            reasons.add(season + " मौसम के लिए उपयुक्त");
        }

        if (climate != null && !climate.isEmpty()) {
            reasons.add(climate + " जलवायु के लिए अनुकूल");
        }

        List<String> cropSoilTypes = crop.getSoilTypes() != null ? crop.getSoilTypes() : new ArrayList<>();
        String primarySoil = soilType.getPrimary() != null ? soilType.getPrimary() : "";
        if (cropSoilTypes.contains(primarySoil)) {
            reasons.add(primarySoil + " मिट्टी के लिए उपयुक्त");
        }

        String cropWaterReq = crop.getWaterRequirement() != null ? crop.getWaterRequirement() : "Medium";
        if (waterAvailability.equals(cropWaterReq)) {
            reasons.add("पानी की उपलब्धता मेल खाती है");
        }

        return reasons;
    }
}
