package com.sachin.aistockdashboard.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "watchlists")
public class Watchlist {
    @Id
    private String id;
    private String userId;
    private List<String> assetSymbols;
}
