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
@Document(collection = "regions")
public class Region {
    @Id
    private String id;

    @Indexed(unique = true)
    private String state;

    private List<String> districts;
    private String climate;
    private Double averageRainfall;
    private Double averageTemperature;

    private SoilType soilType;
    private SoilPh soilPh;

    private String waterAvailability; // Low, Medium, High, Very High
    private List<String> majorCrops;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SoilType {
        private String primary;
        private List<String> secondary;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SoilPh {
        private Double min;
        private Double max;
        private Double average;
    }
}
