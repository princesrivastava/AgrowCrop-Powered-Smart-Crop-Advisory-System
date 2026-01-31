package com.agrowcrop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "crops")
public class Crop {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    private String hindiName;
    private String season; // Kharif, Rabi, Zaid, All
    private List<String> suitableStates;
    private Double minTemperature;
    private Double maxTemperature;
    private Double minRainfall;
    private Double maxRainfall;
    private List<String> soilTypes;
    private Double soilPhMin;
    private Double soilPhMax;
    private String waterRequirement; // Low, Medium, High
    private Integer irrigationPercentage;
    private List<String> fertilizerTypes;
    private String fertilizerGuidance;
    private List<String> sowingMonths;
    private List<String> growthMonths;
    private List<String> harvestingMonths;
    private Integer duration; // in days
    private String yield;
    private String description;
}
