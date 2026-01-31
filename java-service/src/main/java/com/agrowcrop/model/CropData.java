package com.agrowcrop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "crop_data")
@CompoundIndex(name = "env_conditions_idx", def = "{'temperature': 1, 'humidity': 1, 'ph': 1, 'rainfall': 1}")
public class CropData {
    @Id
    private String id;

    private Double N;
    private Double P;
    private Double K;
    private Double temperature;
    private Double humidity;
    private Double ph;
    private Double rainfall;

    @Indexed
    private String label;
}
