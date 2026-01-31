package com.agrowcrop.repository;

import com.agrowcrop.model.FAQ;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FAQRepository extends MongoRepository<FAQ, String> {
    List<FAQ> findByCategoryIgnoreCase(String category);
}
