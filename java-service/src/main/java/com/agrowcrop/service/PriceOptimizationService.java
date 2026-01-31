package com.agrowcrop.service;

import com.agrowcrop.model.MandiPrice;
import com.agrowcrop.repository.MandiPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for price optimization algorithm
 * Finds best mandi based on weighted scoring:
 * - 60% Price (higher is better)
 * - 30% Proximity (same district is better)
 * - 10% Trend (rising trend is better)
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PriceOptimizationService {

    private final MandiPriceRepository mandiPriceRepo;

    /**
     * Find best mandi using optimization algorithm
     * 
     * @param crop     Crop name
     * @param state    State name
     * @param district District name (optional, used for proximity scoring)
     * @return Map with recommended mandi and all options with scores
     */
    public Map<String, Object> findBestMandi(String crop, String state, String district) {
        log.info("Finding best mandi for crop={}, state={}, district={}", crop, state, district);

        // Get today's prices
        List<MandiPrice> todayPrices;

        if (district != null && !district.isEmpty()) {
            // If district specified, get all mandis in that district
            todayPrices = mandiPriceRepo.findByCropAndStateAndDistrictAndDate(
                    crop, state, district, LocalDate.now());

            // If no data for specific district, expand to entire state
            if (todayPrices.isEmpty()) {
                log.info("No data for district {}, expanding to state level", district);
                todayPrices = mandiPriceRepo.findByCropAndStateAndDate(
                        crop, state, LocalDate.now());
            }
        } else {
            // Get all mandis in the state
            todayPrices = mandiPriceRepo.findByCropAndStateAndDate(
                    crop, state, LocalDate.now());
        }

        if (todayPrices.isEmpty()) {
            return Map.of("error", "No price data available for " + crop + " in " + state + " for today");
        }

        // Calculate maximum price for normalization
        int maxPrice = todayPrices.stream()
                .mapToInt(MandiPrice::getPricePerQuintal)
                .max()
                .orElse(1);

        // Calculate scores for each mandi
        List<Map<String, Object>> scoredMandis = todayPrices.stream()
                .map(price -> calculateMandiScore(price, maxPrice, district))
                .sorted((a, b) -> Double.compare((Double) b.get("totalScore"), (Double) a.get("totalScore")))
                .collect(Collectors.toList());

        log.info("Analyzed {} mandis, recommended: {}", scoredMandis.size(),
                scoredMandis.isEmpty() ? "None" : scoredMandis.get(0).get("mandiName"));

        return Map.of(
                "recommended", scoredMandis.get(0),
                "allOptions", scoredMandis,
                "crop", crop,
                "state", state);
    }

    /**
     * Calculate optimization score for a single mandi
     */
    private Map<String, Object> calculateMandiScore(MandiPrice price, int maxPrice, String farmerDistrict) {
        // Price Score (60% weight): Higher price = better score
        double priceScore = ((double) price.getPricePerQuintal() / maxPrice) * 100;

        // Proximity Score (30% weight): Same district = 100, different = 50
        double proximityScore = calculateProximityScore(price, farmerDistrict);

        // Trend Score (10% weight): Rising trend = 100, stable = 50, falling = 25
        double trendScore = calculateTrendScore(price);

        // Weighted total score
        double totalScore = (priceScore * 0.6) + (proximityScore * 0.3) + (trendScore * 0.1);

        Map<String, Object> result = new HashMap<>();
        result.put("mandiName", price.getMandiName());
        result.put("district", price.getDistrict());
        result.put("price", price.getPricePerQuintal());
        result.put("priceScore", Math.round(priceScore * 100) / 100.0);
        result.put("proximityScore", Math.round(proximityScore * 100) / 100.0);
        result.put("trendScore", Math.round(trendScore * 100) / 100.0);
        result.put("totalScore", Math.round(totalScore * 100) / 100.0);

        return result;
    }

    /**
     * Calculate proximity score based on farmer's district
     */
    private double calculateProximityScore(MandiPrice price, String farmerDistrict) {
        if (farmerDistrict == null || farmerDistrict.isEmpty()) {
            return 50.0; // Neutral score if no district specified
        }

        // Same district = 100, different district = 50
        return price.getDistrict().equalsIgnoreCase(farmerDistrict) ? 100.0 : 50.0;
    }

    /**
     * Calculate trend score based on 7-day price history
     */
    private double calculateTrendScore(MandiPrice price) {
        List<MandiPrice> trend = mandiPriceRepo.findTop7ByCropAndMandiNameOrderByDateDesc(
                price.getCrop(), price.getMandiName());

        if (trend.size() < 2) {
            return 50.0; // Neutral score if insufficient data
        }

        // Calculate average daily change
        double totalChange = 0;
        int comparisons = 0;

        for (int i = 0; i < trend.size() - 1; i++) {
            int currentPrice = trend.get(i).getPricePerQuintal();
            int previousPrice = trend.get(i + 1).getPricePerQuintal();
            totalChange += (currentPrice - previousPrice);
            comparisons++;
        }

        double avgChange = comparisons > 0 ? totalChange / comparisons : 0;

        // Score based on average daily change
        if (avgChange > 10)
            return 100.0; // Strong upward trend
        if (avgChange > 0)
            return 75.0; // Moderate upward trend
        if (avgChange == 0)
            return 50.0; // Stable
        if (avgChange > -10)
            return 35.0; // Slight downward trend
        return 25.0; // Strong downward trend
    }
}
