package com.agrowcrop.repository;

import com.agrowcrop.model.MandiPrice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository for MandiPrice with custom query methods using Spring Data naming
 * conventions
 */
@Repository
public interface MandiPriceRepository extends MongoRepository<MandiPrice, String> {

    /**
     * Get today's prices for specific crop, state, and district
     */
    List<MandiPrice> findByCropAndStateAndDistrictAndDate(
            String crop, String state, String district, LocalDate date);

    /**
     * Get prices for a state (all districts) for a specific crop and date
     */
    List<MandiPrice> findByCropAndStateAndDate(
            String crop, String state, LocalDate date);

    /**
     * Get last 7 days trend for a specific mandi and crop
     */
    List<MandiPrice> findTop7ByCropAndMandiNameOrderByDateDesc(
            String crop, String mandiName);

    /**
     * Get all mandis in a state for comparison, ordered by price (descending)
     */
    List<MandiPrice> findByCropAndStateAndDateOrderByPricePerQuintalDesc(
            String crop, String state, LocalDate date);

    /**
     * Get prices for crop in state and district ordered by price
     */
    List<MandiPrice> findByCropAndStateAndDistrictAndDateOrderByPricePerQuintalDesc(
            String crop, String state, String district, LocalDate date);
}
