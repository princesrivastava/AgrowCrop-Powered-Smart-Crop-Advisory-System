package com.agrowcrop.repository;

import com.agrowcrop.model.Region;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegionRepository extends MongoRepository<Region, String> {
    Optional<Region> findByStateIgnoreCase(String state);
}
