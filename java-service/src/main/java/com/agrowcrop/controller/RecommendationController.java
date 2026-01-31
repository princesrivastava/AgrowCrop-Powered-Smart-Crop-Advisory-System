package com.agrowcrop.controller;

import com.agrowcrop.dto.RecommendationRequest;
import com.agrowcrop.dto.RecommendationResponse;
import com.agrowcrop.model.Crop;
import com.agrowcrop.model.Region;
import com.agrowcrop.repository.CropRepository;
import com.agrowcrop.repository.RegionRepository;
import com.agrowcrop.service.CropRecommendationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
@Slf4j
public class RecommendationController {

    private final CropRecommendationService recommendationService;
    private final RegionRepository regionRepository;
    private final CropRepository cropRepository;

    @PostMapping
    public ResponseEntity<RecommendationResponse> getRecommendations(@RequestBody Map<String, String> body) {
        String season = body.get("season");
        String state = body.get("state");

        log.info("Recommendation request → season={}, state={}", season, state);

        try {
            if (season == null || state == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Season and State are required");
            }

            Region region = regionRepository.findByStateIgnoreCase(state)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found: " + state));

            List<Crop> seasonCrops = cropRepository.findBySeasonOrSeason(season, "All");

            if (seasonCrops == null || seasonCrops.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No crops found for season: " + season);
            }

            // 🔧 3️⃣ FILTER BY STATE SAFELY
            List<Crop> filteredCrops = seasonCrops.stream()
                    .filter(crop -> {
                        if (crop.getSuitableStates() == null || crop.getSuitableStates().isEmpty()) {
                            return true; // If no states defined, assume suitable for all
                        }
                        return crop.getSuitableStates().stream()
                                .anyMatch(s -> s != null && s.equalsIgnoreCase(state));
                    })
                    .toList();

            if (filteredCrops.isEmpty()) {
                log.warn("No crops matched for state: {} in season: {}", state, season);
            }

            RecommendationRequest request = new RecommendationRequest();
            request.setSeason(season);
            request.setState(state);
            request.setRegion(region);
            request.setCrops(filteredCrops);

            RecommendationResponse response = recommendationService.generateRecommendations(request);
            response.setState(state);
            response.setSeason(season);
            response.setRegionData(request.getRegion());

            log.info("Recommended crops count: {}", response.getRecommendations().size());

            return ResponseEntity.ok(response);

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error generating recommendations: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error processing recommendation request: " + e.getMessage());
        }
    }

    @PostMapping("/analyze")
    public ResponseEntity<RecommendationResponse> analyzeRecommendations(
            @RequestBody RecommendationRequest request) {

        // Enrich request if data is missing using repositories
        if (request.getRegion() == null && request.getState() != null) {
            regionRepository.findByStateIgnoreCase(request.getState())
                    .ifPresent(r -> request.setRegion(r)); // No conversion needed!
        }
        if (request.getCrops() == null) {
            List<Crop> allCrops = cropRepository.findAll();
            request.setCrops(allCrops); // No conversion needed!
        }

        RecommendationResponse response = recommendationService.generateRecommendations(request);

        // Enrich response for frontend
        response.setState(request.getState());
        response.setSeason(request.getSeason());
        response.setRegionData(request.getRegion());

        return ResponseEntity.ok(response);
    }
}
