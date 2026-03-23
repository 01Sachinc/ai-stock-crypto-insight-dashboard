package com.sachin.aistockdashboard.repositories;

import com.sachin.aistockdashboard.models.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AssetRepository extends MongoRepository<Asset, String> {
    Optional<Asset> findBySymbol(String symbol);
}
