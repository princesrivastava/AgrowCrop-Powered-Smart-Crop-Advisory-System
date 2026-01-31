package com.agrowcrop.controller;

import com.agrowcrop.model.CropData;
import com.agrowcrop.repository.CropDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/crop-data")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class CropDataController {

    private final CropDataRepository cropDataRepository;
    private final MongoTemplate mongoTemplate;

    @GetMapping("/crops")
    public ResponseEntity<List<String>> getAllUniqueCrops() {
        List<String> crops = mongoTemplate.getCollection("crop_data")
                .distinct("label", String.class)
                .into(new ArrayList<>())
                .stream()
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(crops);
    }

    @GetMapping("/stats/{cropName}")
    public ResponseEntity<Map<String, Object>> getCropStats(@PathVariable("cropName") String cropName) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("label").is(cropName.toLowerCase())),
                Aggregation.group("label")
                        .count().as("count")
                        .avg("N").as("avgN")
                        .avg("P").as("avgP")
                        .avg("K").as("avgK")
                        .avg("temperature").as("avgTemperature")
                        .avg("humidity").as("avgHumidity")
                        .avg("ph").as("avgPh")
                        .avg("rainfall").as("avgRainfall")
                        .min("temperature").as("minTemperature")
                        .max("temperature").as("maxTemperature")
                        .min("rainfall").as("minRainfall")
                        .max("rainfall").as("maxRainfall")
                        .min("ph").as("minPh")
                        .max("ph").as("maxPh"));

        @SuppressWarnings("rawtypes")
        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "crop_data", Map.class);
        if (results.getMappedResults().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> stats = (Map<String, Object>) results.getMappedResults().get(0);
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> recommendCrops(@RequestBody Map<String, Double> conditions) {
        Double temperature = conditions.get("temperature");
        Double humidity = conditions.get("humidity");
        Double ph = conditions.get("ph");
        Double rainfall = conditions.get("rainfall");

        if (temperature == null || humidity == null || ph == null || rainfall == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Temperature, humidity, pH, and rainfall are required");
            return ResponseEntity.status(400).body(errorResponse);
        }

        double tempTol = 5.0;
        double humTol = 10.0;
        double phTol = 1.0;
        double rainTol = 50.0;

        List<CropData> matches = cropDataRepository.findByEnvironmentalConditions(
                temperature - tempTol, temperature + tempTol,
                humidity - humTol, humidity + humTol,
                ph - phTol, ph + phTol,
                rainfall - rainTol, rainfall + rainTol);

        // Group by label and calculate scores
        Map<String, List<CropData>> grouped = matches.stream()
                .collect(Collectors.groupingBy(CropData::getLabel));

        List<Map<String, Object>> recommendations = new ArrayList<>();
        for (Map.Entry<String, List<CropData>> entry : grouped.entrySet()) {
            String label = entry.getKey();
            List<CropData> samples = entry.getValue();
            double avgN = samples.stream().mapToDouble(CropData::getN).average().orElse(0);
            double avgP = samples.stream().mapToDouble(CropData::getP).average().orElse(0);
            double avgK = samples.stream().mapToDouble(CropData::getK).average().orElse(0);

            Map<String, Object> rec = new HashMap<>();
            rec.put("crop", label);
            rec.put("count", samples.size());
            rec.put("avgN", avgN);
            rec.put("avgP", avgP);
            rec.put("avgK", avgK);
            rec.put("matchScore", Math.min(100.0, (samples.size() / 10.0) * 100.0));
            recommendations.add(rec);
        }

        recommendations.sort((a, b) -> Integer.compare((Integer) b.get("count"), (Integer) a.get("count")));

        List<Map<String, Object>> topRecommendations = recommendations.stream().limit(10).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("input", conditions);
        response.put("recommendations", topRecommendations);
        response.put("totalMatches", matches.size());

        return ResponseEntity.ok(response);
    }
}
