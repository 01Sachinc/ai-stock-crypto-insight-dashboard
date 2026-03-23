package com.sachin.aistockdashboard.controllers;

import com.sachin.aistockdashboard.services.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ai")
public class AIController {
    @Autowired
    private AIService aiService;

    @PostMapping("/insight")
    public ResponseEntity<String> getInsight(@RequestBody String assetData) {
        return ResponseEntity.ok(aiService.getAIInsight(assetData));
    }
}
