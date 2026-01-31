package com.agrowcrop.dto;

import com.agrowcrop.model.Crop;
import com.agrowcrop.model.Region;
import lombok.Data;
import java.util.List;

@Data
public class RecommendationRequest {
    private String season;
    private String state;
    private Region region;
    private List<Crop> crops;
}
