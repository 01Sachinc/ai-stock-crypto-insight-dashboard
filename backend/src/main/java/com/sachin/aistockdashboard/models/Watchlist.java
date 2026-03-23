package com.sachin.aistockdashboard.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "watchlists")
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String userId; // Usually matches User.username in this app
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "watchlist_assets", joinColumns = @JoinColumn(name = "watchlist_id"))
    @Column(name = "symbol")
    private List<String> assetSymbols;
}
