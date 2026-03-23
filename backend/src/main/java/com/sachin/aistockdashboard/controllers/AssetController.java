package com.sachin.aistockdashboard.controllers;

import com.sachin.aistockdashboard.models.Asset;
import com.sachin.aistockdashboard.services.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/assets")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @GetMapping("/{type}/{symbol}")
    public ResponseEntity<Asset> getAssetStatus(@PathVariable String type, @PathVariable String symbol) {
        Asset asset = assetService.getAssetData(symbol, type);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        }
        return ResponseEntity.notFound().build();
    }
}
