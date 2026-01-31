package com.agrowcrop.dto;

import com.agrowcrop.model.Crop;
import lombok.Data;
import java.util.List;

@Data
public class CropRecommendation {
    private Crop crop;
    private double score;
    private int irrigationPercentage;
    private String fertilizerGuidance;
    private List<String> reasons;
}
