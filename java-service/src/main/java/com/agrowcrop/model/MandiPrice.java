package com.agrowcrop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

/**
 * MongoDB entity for storing mandi price data
 * Compound index optimizes queries on crop + state + district + date
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mandi_prices")
@CompoundIndex(name = "crop_location_date_idx", def = "{'crop': 1, 'state': 1, 'district': 1, 'date': -1}")
public class MandiPrice {

    @Id
    private String id;

    private String mandiName;
    private String crop;
    private Integer pricePerQuintal;
    private LocalDate date;
    private String state;
    private String district;

    // Optional fields for optimization algorithm
    private Double latitude;
    private Double longitude;
    private String marketYardCode;
}
