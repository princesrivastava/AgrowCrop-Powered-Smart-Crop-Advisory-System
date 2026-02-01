package com.agrowcrop.controller;

import com.agrowcrop.dto.PriceOptimizationRequest;
import com.agrowcrop.model.MandiPrice;
import com.agrowcrop.repository.MandiPriceRepository;
import com.agrowcrop.service.AgmarknetDataService;
import com.agrowcrop.service.PriceOptimizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * REST API Controller for Market Price Dashboard
 * Provides endpoints for:
 * - Fetching today's mandi prices
 * - Getting 7-day price trends
 * - Comparing nearby mandis
 * - Getting optimized mandi recommendations
 */
@Slf4j
@RestController
@RequestMapping("/api/market-prices")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class MandiPriceController {

    private final MandiPriceRepository mandiPriceRepo;
    private final PriceOptimizationService optimizationService;
    private final AgmarknetDataService agmarknetDataService;

    /**
     * GET /api/market-prices/today
     * Returns today's prices for specified crop and state
     * 
     * @param crop     Crop name (e.g., "Wheat", "Rice")
     * @param state    State name (e.g., "Madhya Pradesh")
     * @param district Optional district name for filtering
     * @return List of mandi prices for today
     */
    @GetMapping("/today")
    public List<MandiPrice> getTodayPrices(
            @RequestParam String crop,
            @RequestParam String state,
            @RequestParam(required = false) String district) {
        log.info("Fetching today's prices for crop={}, state={}, district={}", crop, state, district);

        if (district != null && !district.isEmpty()) {
            return mandiPriceRepo.findByCropAndStateAndDistrictAndDateOrderByPricePerQuintalDesc(
                    crop, state, district, LocalDate.now());
        } else {
            return mandiPriceRepo.findByCropAndStateAndDateOrderByPricePerQuintalDesc(
                    crop, state, LocalDate.now());
        }
    }

    /**
     * GET /api/market-prices/trend
     * Returns 7-day price trend for a specific mandi
     * 
     * @param crop  Crop name
     * @param mandi Mandi name
     * @return List of prices for last 7 days (newest first)
     */
    @GetMapping("/trend")
    public List<MandiPrice> get7DayTrend(
            @RequestParam String crop,
            @RequestParam String mandi) {
        log.info("Fetching 7-day trend for crop={}, mandi={}", crop, mandi);
        return mandiPriceRepo.findTop7ByCropAndMandiNameOrderByDateDesc(crop, mandi);
    }

    /**
     * GET /api/market-prices/compare
     * Compares prices across all mandis in a state
     * 
     * @param crop  Crop name
     * @param state State name
     * @return List of all mandis with prices, sorted by price (descending)
     */
    @GetMapping("/compare")
    public List<MandiPrice> compareMandis(
            @RequestParam String crop,
            @RequestParam String state) {
        log.info("Comparing mandis for crop={}, state={}", crop, state);
        return mandiPriceRepo.findByCropAndStateAndDateOrderByPricePerQuintalDesc(
                crop, state, LocalDate.now());
    }

    /**
     * POST /api/market-prices/optimize
     * Recommends best mandi using optimization algorithm
     * Algorithm: 60% price + 30% proximity + 10% trend
     * 
     * @param request Contains crop, state, and optional district
     * @return Map with recommended mandi and all options with scores
     */
    @PostMapping("/optimize")
    public Map<String, Object> getOptimizedRecommendation(
            @RequestBody PriceOptimizationRequest request) {
        log.info("Getting optimized recommendation for: {}", request);
        return optimizationService.findBestMandi(
                request.getCrop(),
                request.getState(),
                request.getDistrict());
    }

    /**
     * POST /api/market-prices/fetch-now
     * Manually trigger data fetch (for testing)
     * 
     * @return Success message
     */
    @PostMapping("/fetch-now")
    public Map<String, String> triggerDataFetch() {
        log.info("Manual data fetch triggered");
        agmarknetDataService.fetchNow();
        return Map.of("status", "success", "message", "Data fetch initiated");
    }

    /**
     * GET /api/market-prices/health
     * Health check endpoint
     */
    @GetMapping("/health")
    public org.springframework.http.ResponseEntity<String> healthCheck() {
        return org.springframework.http.ResponseEntity.ok("OK");
    }
}
