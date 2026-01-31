package com.agrowcrop.repository;

import com.agrowcrop.model.CropData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropDataRepository extends MongoRepository<CropData, String> {
    List<CropData> findByLabel(String label);

    @Query("{ 'label': ?0 }")
    List<CropData> findAllByLabel(String label);

    @Query("{ 'temperature': { $gte: ?0, $lte: ?1 }, 'humidity': { $gte: ?2, $lte: ?3 }, 'ph': { $gte: ?4, $lte: ?5 }, 'rainfall': { $gte: ?6, $lte: ?7 } }")
    List<CropData> findByEnvironmentalConditions(
            Double minTemp, Double maxTemp,
            Double minHumidity, Double maxHumidity,
            Double minPh, Double maxPh,
            Double minRainfall, Double maxRainfall);
}
