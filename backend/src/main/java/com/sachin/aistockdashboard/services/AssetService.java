package com.sachin.aistockdashboard.services;

import com.sachin.aistockdashboard.models.Asset;
import com.sachin.aistockdashboard.repositories.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Service
public class AssetService {
    @Autowired
    private AssetRepository assetRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public Asset getAssetData(String symbol, String type) {
        if ("crypto".equalsIgnoreCase(type)) {
            return getCryptoData(symbol);
        } else {
            return getStockData(symbol);
        }
    }

    private Asset getCryptoData(String id) {
        // Using CoinGecko Free API
        String url = "https://api.coingecko.com/api/v3/coins/" + id.toLowerCase();
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                Map<String, Object> marketData = (Map<String, Object>) response.get("market_data");
                Map<String, Object> currentPrice = (Map<String, Object>) marketData.get("current_price");
                
                Asset asset = new Asset();
                asset.setSymbol((String) response.get("symbol"));
                asset.setName((String) response.get("name"));
                asset.setType("crypto");
                asset.setLastPrice(Double.valueOf(currentPrice.get("usd").toString()));
                asset.setMarketCap(Double.valueOf(((Map<String, Object>)marketData.get("market_cap")).get("usd").toString()));
                asset.setVolume(Double.valueOf(((Map<String, Object>)marketData.get("total_volume")).get("usd").toString()));
                
                return asset;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Asset getStockData(String symbol) {
        // Yahoo Finance informal API (using query2)
        String url = "https://query2.finance.yahoo.com/v8/finance/chart/" + symbol.toUpperCase();
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                Map<String, Object> chart = (Map<String, Object>) response.get("chart");
                Map<String, Object> result = ((java.util.List<Map<String, Object>>) chart.get("result")).get(0);
                Map<String, Object> meta = (Map<String, Object>) result.get("meta");
                
                Asset asset = new Asset();
                asset.setSymbol(symbol.toUpperCase());
                asset.setName(symbol.toUpperCase()); // Yahoo Finance meta might not have full name in this endpoint
                asset.setType("stock");
                asset.setLastPrice(Double.valueOf(meta.get("regularMarketPrice").toString()));
                // Market cap and volume are harder from this endpoint, might need a different one or mock for now
                asset.setMarketCap(0.0); 
                asset.setVolume(Double.valueOf(meta.get("regularMarketVolume").toString()));
                
                return asset;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
