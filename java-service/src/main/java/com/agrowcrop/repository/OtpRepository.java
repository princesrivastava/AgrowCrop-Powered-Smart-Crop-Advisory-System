package com.agrowcrop.repository;

import com.agrowcrop.model.OtpToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface OtpRepository extends MongoRepository<OtpToken, String> {
    Optional<OtpToken> findByPhone(String phone);

    void deleteByPhone(String phone);
}
