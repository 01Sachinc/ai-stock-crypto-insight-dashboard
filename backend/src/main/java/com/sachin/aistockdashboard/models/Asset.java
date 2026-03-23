package com.sachin.aistockdashboard.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "assets")
public class Asset {
    @Id
    private String id;
    private String symbol;
    private String name;
    private String type; // "stock" or "crypto"
    private Double lastPrice;
    private Double marketCap;
    private Double volume;
}
