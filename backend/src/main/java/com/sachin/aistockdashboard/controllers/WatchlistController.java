package com.sachin.aistockdashboard.controllers;

import com.sachin.aistockdashboard.models.Watchlist;
import com.sachin.aistockdashboard.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistRepository watchlistRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Watchlist> getWatchlist(@PathVariable String userId) {
        return watchlistRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new Watchlist(null, userId, new ArrayList<>())));
    }

    @PostMapping("/{userId}/add/{symbol}")
    public ResponseEntity<?> addToWatchlist(@PathVariable String userId, @PathVariable String symbol) {
        Watchlist watchlist = watchlistRepository.findByUserId(userId)
                .orElse(new Watchlist(null, userId, new ArrayList<>()));
        
        if (!watchlist.getAssetSymbols().contains(symbol)) {
            watchlist.getAssetSymbols().add(symbol);
            watchlistRepository.save(watchlist);
        }
        return ResponseEntity.ok(watchlist);
    }
    
    @DeleteMapping("/{userId}/remove/{symbol}")
    public ResponseEntity<?> removeFromWatchlist(@PathVariable String userId, @PathVariable String symbol) {
        Optional<Watchlist> watchlistOpt = watchlistRepository.findByUserId(userId);
        if (watchlistOpt.isPresent()) {
            Watchlist watchlist = watchlistOpt.get();
            watchlist.getAssetSymbols().remove(symbol);
            watchlistRepository.save(watchlist);
            return ResponseEntity.ok(watchlist);
        }
        return ResponseEntity.notFound().build();
    }
}
