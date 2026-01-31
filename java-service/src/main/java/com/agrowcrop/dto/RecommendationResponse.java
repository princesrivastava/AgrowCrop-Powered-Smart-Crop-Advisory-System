package com.agrowcrop.dto;

import com.agrowcrop.model.Region;
import lombok.Data;
import java.util.List;

@Data
public class RecommendationResponse {
    private String state;
    private String season;
    private Region regionData;
    private List<CropRecommendation> recommendations;

    public RecommendationResponse() {
    }

    public RecommendationResponse(List<CropRecommendation> recommendations) {
        this.recommendations = recommendations;
    }
}
