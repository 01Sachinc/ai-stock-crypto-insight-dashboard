package com.sachin.aistockdashboard.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {
    @Value("${huggingface.api.key}")
    private String hfApiKey;

    private final String HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
    private final RestTemplate restTemplate = new RestTemplate();

    public String getAIInsight(String assetData) {
        if (hfApiKey == null || hfApiKey.isEmpty() || hfApiKey.equals("your_huggingface_key")) {
            return "AI Insight Unavailable (No API Key provided). Trend: Neutral, Risk: Low, Reason: No live analysis.";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + hfApiKey);

        String prompt = "Analyze financial data and return: 1. Trend (Bullish/Bearish/Neutral), 2. Reason, 3. Risk level, 4. Short-term outlook. Data: " + assetData;
        
        Map<String, Object> body = new HashMap<>();
        body.put("inputs", prompt);
        
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            java.util.List<Map<String, Object>> response = restTemplate.postForObject(HF_API_URL, entity, java.util.List.class);
            if (response != null && !response.isEmpty()) {
                return (String) response.get(0).get("generated_text");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Error generating AI insight.";
    }
}
