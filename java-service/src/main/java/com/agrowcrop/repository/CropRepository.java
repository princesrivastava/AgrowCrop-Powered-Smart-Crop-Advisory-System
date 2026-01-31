package com.agrowcrop.repository;

import com.agrowcrop.model.Crop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CropRepository extends MongoRepository<Crop, String> {
    Optional<Crop> findByName(String name);

    List<Crop> findBySeasonOrSeason(String season, String allSeason);
}
