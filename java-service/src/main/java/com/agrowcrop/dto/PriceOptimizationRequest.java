package com.agrowcrop.dto;

import lombok.Data;

/**
 * Request DTO for price optimization
 */
@Data
public class PriceOptimizationRequest {
    private String crop;
    private String state;
    private String district; // Optional - used for proximity scoring
}
